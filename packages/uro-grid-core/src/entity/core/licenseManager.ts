import { exists, missingOrEmptyObject } from '@uroborus/core';
import { md5ToHex } from '@uroborus/core/src/util/md5';

export class LicenseManager {
  private static RELEASE_INFORMATION = 'MTY1NzIxMjEzNTQ0Ng==';

  private static licenseKey: string;

  private static watermarkMessage: string;

  public static setLicenseKey(licenseKey: string): void {
    LicenseManager.licenseKey = licenseKey;
    LicenseManager.validateLicense();
  }

  public static validateLicense() {
    if (missingOrEmptyObject(LicenseManager.licenseKey)) {
      LicenseManager.outputMissingLicenseKey();
    } else if (LicenseManager.licenseKey.length > 32) {
      const { md5, license, version, isTrial } =
        LicenseManager.extractLicenseComponents(LicenseManager.licenseKey);

      if (md5 === md5ToHex(license)) {
        if (exists(version) && version) {
          LicenseManager.validateLicenseKeyForVersion(
            version,
            !!isTrial,
            license,
          );
        } else {
          LicenseManager.validateLegacyKey(license);
        }
      } else {
        LicenseManager.outputInvalidLicenseKey();
      }
    } else {
      LicenseManager.outputInvalidLicenseKey();
    }
  }

  public static isDisplayWatermark(): boolean {
    return missingOrEmptyObject(LicenseManager.licenseKey);
  }

  public static getWatermarkMessage(): string {
    return this.watermarkMessage || '';
  }

  private static validateLicenseKeyForVersion(
    version: string,
    isTrial: boolean,
    license: string,
  ) {
    if (version !== '2') {
      return;
    }

    if (isTrial) {
      LicenseManager.validateForTrial(license);
    } else {
      LicenseManager.validateLegacyKey(license);
    }
  }

  private static validateForTrial(license: string) {
    const expiry = LicenseManager.extractExpiry(license);
    const now = new Date();

    let valid = false;
    let current = false;
    if (!Number.isNaN(expiry.getTime())) {
      valid = true;
      current = expiry > now;
    }

    if (!valid) {
      LicenseManager.outputInvalidLicenseKey();
    } else if (!current) {
      const formattedExpiryDate = LicenseManager.formatDate(expiry);
      LicenseManager.outputExpiredTrialKey(formattedExpiryDate);
    }
  }

  private static validateLegacyKey(license: string) {
    const gridReleaseDate = LicenseManager.getGridReleaseDate();
    const expiry = LicenseManager.extractExpiry(license);

    let valid = false;
    let current = false;
    if (!Number.isNaN(expiry.getTime())) {
      valid = true;
      current = gridReleaseDate < expiry;
    }

    if (!valid) {
      this.outputInvalidLicenseKey();
    } else if (!current) {
      const formattedExpiryDate = LicenseManager.formatDate(expiry);
      const formattedReleaseDate = LicenseManager.formatDate(gridReleaseDate);

      LicenseManager.outputIncompatibleVersion(
        formattedExpiryDate,
        formattedReleaseDate,
      );
    }
  }

  private static formatDate(date: any): string {
    const monthNames: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  private static getGridReleaseDate() {
    return new Date(
      parseInt(LicenseManager.decode(LicenseManager.RELEASE_INFORMATION), 10),
    );
  }

  private static extractExpiry(license: string) {
    const restrictionHashed = license.substring(
      license.lastIndexOf('_') + 1,
      license.length,
    );
    return new Date(parseInt(LicenseManager.decode(restrictionHashed), 10));
  }

  private static decode(input: string): string {
    const keystr =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let t = '';
    let n: any;
    let r: any;
    let i: any;
    let s: any;
    let o: any;
    let u: any;
    let a: any;
    let f = 0;
    const e: string = input.replace(/[^A-Za-z0-9+/=]/g, '');
    while (f < e.length) {
      s = keystr.indexOf(e.charAt(f));
      f += 1;
      o = keystr.indexOf(e.charAt(f));
      f += 1;
      u = keystr.indexOf(e.charAt(f));
      f += 1;
      a = keystr.indexOf(e.charAt(f));
      f += 1;
      n = (s << 2) | (o >> 4);
      r = ((o & 15) << 4) | (u >> 2);
      i = ((u & 3) << 6) | a;
      t += String.fromCharCode(n);
      if (u !== 64) {
        t += String.fromCharCode(r);
      }
      if (a !== 64) {
        t += String.fromCharCode(i);
      }
    }
    t = LicenseManager.utf8_decode(t);
    return t;
  }

  private static utf8_decode(input: string): string {
    const ip = input.replace(/rn/g, 'n');
    let t = '';
    for (let n = 0; n < ip.length; n++) {
      const r = ip.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode((r >> 6) | 192);
        t += String.fromCharCode((r & 63) | 128);
      } else {
        t += String.fromCharCode((r >> 12) | 224);
        t += String.fromCharCode(((r >> 6) & 63) | 128);
        t += String.fromCharCode((r & 63) | 128);
      }
    }
    return t;
  }

  private static extractLicenseComponents(licenseKey: string) {
    // when users copy the license key from a PDF extra zero width characters are sometimes copied too
    // carriage returns and line feeds are problematic too
    // all of which causes license key validation to fail - strip these out
    let cleanedLicenseKey = licenseKey.replace(/[\u200B-\u200D\uFEFF]/g, '');
    cleanedLicenseKey = cleanedLicenseKey.replace(/\r?\n|\r/g, '');

    const hashStart = cleanedLicenseKey.length - 32;
    const md5 = cleanedLicenseKey.substring(hashStart);
    const license = cleanedLicenseKey.substring(0, hashStart);
    const [version, isTrial] =
      LicenseManager.extractBracketedInformation(cleanedLicenseKey);
    return { md5, license, version, isTrial };
  }

  private static extractBracketedInformation(
    licenseKey: string,
  ): [string | null, boolean | null] {
    const matches = licenseKey
      .split('[')
      .filter(function (v) {
        return v.indexOf(']') > -1;
      })
      .map(function (value) {
        return value.split(']')[0];
      });

    if (!matches || matches.length === 0) {
      return [null, null];
    }

    const isTrial = matches.filter((match) => match === 'TRIAL').length === 1;
    const version = matches
      .filter((match) => match.indexOf('v') === 0)
      .map((match) => match.replace(/^v/, ''))[0];

    return [version, isTrial];
  }

  private static outputInvalidLicenseKey() {
    console.error(
      '*****************************************************************************************************************',
    );
    console.error(
      '***************************************** X-Grid 企业许可证 *****************************************************',
    );
    console.error(
      '********************************************* Invalid License ***************************************************',
    );
    console.error(
      '* 您的X-Grid 企业许可证无效-请联系info@xxx.com以获取有效许可证。 *******************************************************',
    );
    console.error(
      '*****************************************************************************************************************',
    );
    console.error(
      '*****************************************************************************************************************',
    );

    LicenseManager.watermarkMessage = '无效的许可证';
  }

  private static outputExpiredTrialKey(formattedExpiryDate: string) {
    console.error(
      '****************************************************************************************************************',
    );
    console.error(
      '***************************************** X-Grid 企业许可证 *****************************************************',
    );
    console.error(
      '*****************************************   试用期已过。    *****************************************************',
    );
    console.error(
      `* 您的X-Grid 企业许可证已guo过期于 ${formattedExpiryDate}.                                                        *`,
    );
    console.error(
      '* 请致电购买许可证。                                                                                             *',
    );
    console.error(
      '****************************************************************************************************************',
    );
    console.error(
      '****************************************************************************************************************',
    );

    this.watermarkMessage = '试用期已过';
  }

  private static outputMissingLicenseKey() {
    console.error(
      '****************************************************************************************************************',
    );
    console.error(
      '***************************************** X-Grid 企业许可证 *****************************************************',
    );
    console.error(
      '****************************************** License Key Not Found ***********************************************',
    );
    console.error(
      '* 这是一个仅供评估的版本，未获得用于生产的开发项目的许可。***************************************************************',
    );
    console.error(
      '* 如果您想隐藏水印，请购买许可证。***********************************************************************************',
    );
    console.error(
      '****************************************************************************************************************',
    );
    console.error(
      '****************************************************************************************************************',
    );

    LicenseManager.watermarkMessage = '仅供试用';
  }

  private static outputIncompatibleVersion(
    formattedExpiryDate: string,
    formattedReleaseDate: string,
  ) {
    console.error(
      '****************************************************************************************************************************',
    );
    console.error(
      '****************************************************************************************************************************',
    );
    console.error(
      '*                                             X-Grid 企业许可证                                                              *',
    );
    console.error(
      '*                                          X-Grid 企业许可证版本不兼容。                                                       *',
    );
    console.error(
      '*                                                                                                                          *',
    );
    console.error(
      `*  您的X-Grid 企业许可证可使用涵盖的时间内发布的X-Grid的所有版本                                                                   *`,
    );
    console.error(
      `* - X-Grid X-Grid 企业许可证提供一年使用权，使您有权在该年内获得X-Grid的所有版本/更新。                                              *`,
    );
    console.error(
      `* 您的许可证密钥已过期于 ${formattedExpiryDate}, 但是，您尝试使用的X-Grid版本发布于${formattedReleaseDate}                        *`,
    );
    console.error(
      '****************************************************************************************************************************',
    );
    console.error(
      '****************************************************************************************************************************',
    );

    this.watermarkMessage = '许可证已过期';
  }
}
