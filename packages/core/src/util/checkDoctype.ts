import type { Logger } from '../logger/index.js';

const suffix = `
  We expect a html5 doctype: <!doctype html>
  This is to ensure consistent browser layout and measurement`;

export default (doc: Document, logger: Logger) => {
  const { doctype } = doc;

  if (!doctype) {
    logger.warn(`
      No <!doctype html> found.

      ${suffix}
    `);
  }

  if (doctype && doctype.name.toLowerCase() !== 'html') {
    logger.warn(`
      Unexpected <!doctype> found: (${doctype.name})

      ${suffix}
    `);
  }

  if (doctype && doctype.publicId !== '') {
    logger.warn(`
      Unexpected <!doctype> publicId found: (${doctype.publicId})
      html5 文档类型不应该包含 publicId

      ${suffix}
    `);
  }
};
