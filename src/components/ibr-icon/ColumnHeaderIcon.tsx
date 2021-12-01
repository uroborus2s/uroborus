import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { FC, memo } from 'react';

const TextIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M2.554 12.615L6.628 2.429C6.834 1.916 7.448 1.5 8 1.5c.556 0 1.166.416 1.372.93l4.074 10.185c.306.765-.116 1.385-.944 1.385h-.252a1.1 1.1 0 0 1-.987-.711l-.526-1.578c-.13-.39-.577-.711-.996-.711H6.259c-.43 0-.865.318-.996.711l-.526 1.578c-.13.39-.573.711-.987.711h-.252c-.828 0-1.25-.62-.944-1.385zM6.371 8.07c-.205.513.072.929.638.929h1.982c.557 0 .845-.41.637-.929L8.556 5.393c-.308-.77-.806-.77-1.114 0L6.372 8.07z"
    />
  </SvgIcon>
);

const MultilineTextIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M.063 8.502l2.816-7.04c.1-.249.41-.462.689-.462h.267c.282 0 .586.207.689.463l2.815 7.039c.1.25-.04.462-.319.462h-.84a.36.36 0 0 1-.327-.234l-.398-1.195a.731.731 0 0 0-.659-.482h-2.19c-.268 0-.57.216-.658.482L1.549 8.73a.364.364 0 0 1-.327.234h-.84c-.282 0-.42-.207-.319-.462zm2.552-3.193c-.104.26.03.47.303.47h1.566c.272 0 .408-.21.304-.47l-.719-1.795c-.203-.509-.535-.505-.737 0L2.615 5.31zM8 8c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H8.997A.996.996 0 0 1 8 8zm0-3c0-.552.444-1 1-1h3c.552 0 1 .444 1 1 0 .552-.444 1-1 1H9c-.552 0-1-.444-1-1zm-8 6c0-.552.449-1 1.007-1h12.986c.556 0 1.007.444 1.007 1 0 .552-.449 1-1.007 1H1.007A1.001 1.001 0 0 1 0 11zm0 3a1 1 0 0 1 .999-1H12a1 1 0 1 1 0 2H1A.997.997 0 0 1 0 14z"
    />
  </SvgIcon>
);

const AttachmentIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M11.791,6 L9.498,6 C9.223,6 9,5.777 9,5.502 L9,3.213 C9,2.766 9.541,2.541 9.858,2.858 L12.145,5.145 C12.461,5.461 12.237,6 11.791,6 M10.7059121,1.70591205 C10.3160476,1.31604759 9.56211865,1 8.99707067,1 L5.00591905,1 C3.89808055,1 3,1.89706013 3,3.00585866 L3,12.9941413 C3,14.1019465 3.90017617,15 4.99201702,15 L12.007983,15 C13.1081436,15 14,14.1125667 14,13.000385 L14,5.99539757 C14,5.44565467 13.6861267,4.68612671 13.2940879,4.29408795 L10.7059121,1.70591205 Z"
    />
  </SvgIcon>
);

const CheckboxIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M1 4.003A3.002 3.002 0 0 1 4.003 1h7.994A3.002 3.002 0 0 1 15 4.003v7.994A3.002 3.002 0 0 1 11.997 15H4.003A3.002 3.002 0 0 1 1 11.997V4.003zm5.28 7.42c.41.368 1.064.35 1.454-.035l4.67-4.606c.515-.508.52-1.331.012-1.84l.062.063a1.27 1.27 0 0 0-1.817.008l-3.298 3.42a.505.505 0 0 1-.707.014l-1.162-1.08a1.36 1.36 0 0 0-1.872.036l.063-.062A1.225 1.225 0 0 0 3.73 9.13l2.55 2.293z"
    />
  </SvgIcon>
);

const SelectIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zM5.032 6.835l2.437 3.83c.29.457.77.461 1.063 0l2.436-3.83c.291-.457.083-.835-.47-.835H5.502c-.565 0-.765.374-.471.835z"
    />
  </SvgIcon>
);

const MultiSelectIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M11.079834,12.3117676 C10.7596005,11.8634407 10.9437166,11.5 11.4998075,11.5 L14.5001925,11.5 C15.0523709,11.5 15.2418723,11.8613788 14.920166,12.3117676 L13.579834,14.1882324 C13.2596005,14.6365593 12.7418723,14.6386212 12.420166,14.1882324 L11.079834,12.3117676 Z M11.079834,2.31176758 C10.7596005,1.86344072 10.9437166,1.5 11.4998075,1.5 L14.5001925,1.5 C15.0523709,1.5 15.2418723,1.86137885 14.920166,2.31176758 L13.579834,4.18823242 C13.2596005,4.63655928 12.7418723,4.63862115 12.420166,4.18823242 L11.079834,2.31176758 Z M11.0798069,7.31176758 C10.7595884,6.86344072 10.9437166,6.5 11.4998075,6.5 L14.5001925,6.5 C15.0523709,6.5 15.2418602,6.86137885 14.9201389,7.31176758 L13.5797443,9.18823242 C13.2594958,9.63655928 12.7417675,9.63862115 12.4200763,9.18823242 L11.0798069,7.31176758 Z M1,3 C1,2.44771525 1.45368241,2 2.00385145,2 L8.89799958,2 C9.45241142,2 9.90185103,2.44386482 9.90185103,3 C9.90185103,3.55228475 9.44816862,4 8.89799958,4 L2.00385145,4 C1.4494396,4 1,3.55613518 1,3 Z M1,8 C1,7.44771525 1.45368241,7 2.00385145,7 L8.89799958,7 C9.45241142,7 9.90185103,7.44386482 9.90185103,8 C9.90185103,8.55228475 9.44816862,9 8.89799958,9 L2.00385145,9 C1.4494396,9 1,8.55613518 1,8 Z M1,13 C1,12.4477153 1.45368241,12 2.00385145,12 L8.89799958,12 C9.45241142,12 9.90185103,12.4438648 9.90185103,13 C9.90185103,13.5522847 9.44816862,14 8.89799958,14 L2.00385145,14 C1.4494396,14 1,13.5561352 1,13 Z"
    />
  </SvgIcon>
);

const CollaboratorIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M10.9829643,12.6437806 C12.5286237,12.8078951 14.5,12.5099682 14.5,11.75 C14.5,10.5 13.8333333,8.66666667 11.8333333,8.66666667 C11.1832271,8.66666667 10.6740002,8.86037582 10.2827561,9.1647938 C10.7576427,9.97237834 11,11.0340775 11,12.375 C11,12.4666129 10.9943133,12.5562282 10.9829643,12.6437806 Z M5.5,7 C4.11928813,7 3,5.88071187 3,4.5 C3,3.11928813 4.11928813,2 5.5,2 C6.88071187,2 8,3.11928813 8,4.5 C8,5.88071187 6.88071187,7 5.5,7 Z M11.8333333,8 C10.7287638,8 9.83333333,7.1045695 9.83333333,6 C9.83333333,4.8954305 10.7287638,4 11.8333333,4 C12.9379028,4 13.8333333,4.8954305 13.8333333,6 C13.8333333,7.1045695 12.9379028,8 11.8333333,8 Z M5.5,8 C8.16666667,8 10,9 10,12.5 C10,13.4454885 9,14.5 5.5,14.5 C2,14.5 1,13.5545115 1,12.5 C1,9 2.83333333,8 5.5,8 Z"
    />
  </SvgIcon>
);

const DateIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M1 2.5C1 1.67 1.68 1 2.5 1h11c.83 0 1.5.68 1.5 1.5v11c0 .83-.68 1.5-1.5 1.5h-11c-.83 0-1.5-.68-1.5-1.5v-11zm2 0c0 .27.22.5.5.5h3c.28 0 .5-.22.5-.5 0-.27-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5zm6 0c0 .27.22.5.5.5h3c.28 0 .5-.22.5-.5 0-.27-.22-.5-.5-.5h-3c-.28 0-.5.22-.5.5zm-3.8 9.05c-.53 0-.87-.3-.87-.78v-.1c0-.1-.08-.2-.2-.2H3.2c-.1 0-.2.1-.2.2v.1c0 1.15.98 2.06 2.2 2.06 1.2 0 2.17-.9 2.17-2.06 0-.52-.23-1.06-.62-1.36-.05-.04-.05-.1 0-.16.3-.3.52-.76.52-1.23 0-1.1-.93-1.97-2.08-1.97-1.16 0-2.1.88-2.1 1.98v.15c0 .1.08.2.18.2h.95c.1 0 .2-.1.2-.2V8c0-.42.32-.7.76-.7s.75.28.75.7c0 .44-.3.72-.76.72h-.13c-.1 0-.2.1-.2.2v.88c0 .1.1.18.2.18h.12c.5 0 .84.3.84.8 0 .47-.34.77-.85.77zm5.5 1.25c0 .1.1.2.22.2h1.03c.1 0 .2-.1.2-.2V6.2c0-.1-.1-.2-.2-.2H10.8c-.27 0-.44.14-.53.24l-.85.96c-.15.15-.17.28-.17.44v.96c0 .2.23.28.35.16l.9-.84c.07-.06.2-.05.2.08v4.8z"
    />
  </SvgIcon>
);

const PhoneIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M6.2223,2.8573 C6.4953,3.1303 6.4953,3.5723 6.2223,3.8453 L5.2333,4.8333 C4.9603,5.1063 5.0863,5.4653 5.2333,5.8213 C5.5833,6.6653 6.3453,7.5103 7.4163,8.5813 C8.6103,9.7763 9.3313,10.3323 10.1753,10.7653 C10.5193,10.9413 10.8913,11.0383 11.1633,10.7653 L12.1523,9.7783 C12.4253,9.5053 12.8673,9.5053 13.1403,9.7783 L15.1173,11.7563 C15.3903,12.0293 15.3903,12.4713 15.1173,12.7443 L13.0653,14.7953 C12.8233,15.0373 12.4423,15.0683 12.1643,14.8693 C12.1643,14.8693 8.1363,13.6693 5.2333,10.7653 C2.2063,7.7373 1.1303,3.8303 1.1303,3.8303 C0.9313,3.5523 0.9633,3.1713 1.2043,2.9303 L3.2573,0.8793 C3.5303,0.6063 3.9723,0.6063 4.2453,0.8793 L6.2223,2.8573 Z"
    />
  </SvgIcon>
);

const EmailIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M1,11.5004529 L1,8.28698353 C1,7.74071872 1.39692412,7.50310534 1.88655484,7.76240678 L7.11344516,10.5304932 C7.60359323,10.7900686 8.39692412,10.7897947 8.88655484,10.5304932 L14.1134452,7.76240678 C14.6035932,7.50283136 15,7.73797416 15,8.28700095 L15,11.5005267 C15,12.3229093 14.3292128,12.9999952 13.5017548,12.9999893 L2.49824524,12.9999107 C1.6752491,12.9999048 1,12.3285747 1,11.5004529 Z M1,5.5 L1,4.49755925 C1,3.66995412 1.67078724,3 2.49824524,3 L13.5017548,3 C14.3247509,3 15,3.67048011 15,4.49755925 L15,5.5 L8.88655484,8.55672258 C8.39640677,8.80179662 7.60307588,8.80153794 7.11344516,8.55672258 L1,5.5 Z"
    />
  </SvgIcon>
);

const URLIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M3,9 C3.55,9 4,9.45003 4,10 C4,10.55003 3.55,11.00003 3,11.00003 L2.00104344,11.00002 C0.90009892,11.000009 -3.94535344e-16,10.1077607 -3.94535344e-16,9.00712765 L-3.94535344e-16,4.49287235 C-3.94535344e-16,3.39358348 0.891856397,2.5 1.99201702,2.5 L9.00798298,2.5 C10.0998238,2.5 11,3.39596581 11,4.50119565 L11,8.00003 C11,8.55003 10.55,9 10,9 C9.45,9 9,8.55003 9,8.00003 L9,5.99898656 C9,5.44269033 8.55097324,5.00003 7.99707067,5.00003 L3.00292933,5.00003 C2.43788135,5.00003 2,5.45193985 2,6.0093989 L2,7.9906611 C2,8.55667682 2.44771525,9 3,9 Z M13,4.99993 L13.9989566,4.99993 C15.0999011,4.99993 16,5.89217669 16,6.99281876 L16,11.5071112 C16,12.6064092 15.1081436,13.5 14.007983,13.5 L6.99201702,13.5 C5.90017617,13.5 5,12.6040277 5,11.4987898 L5,7.99993 C5,7.44993 5.45,6.99993 6,6.99993 C6.55,6.99993 7,7.44993 7,7.99993 L7,10.0009734 C7,10.5572697 7.44902676,10.99993 8.00292933,10.99993 L12.9970707,10.99993 C13.5621186,10.99993 14,10.5480202 14,9.9905611 L14,8.0092989 C14,7.44328318 13.5535691,6.99993 13.0028687,6.99993 L13,6.99993 C12.45,6.99993 12,6.54993 12,5.99993 C12,5.44993 12.45,4.99993 13,4.99993 Z"
    />
  </SvgIcon>
);

const NumberIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M4,10 L4,6.06298828 L2.01023277,6.06298828 C1.44124014,6.06298828 0.979980469,5.60514432 0.979980469,5.03149414 C0.979980469,4.46181566 1.446147,4 2.01023277,4 L4,4 L4,2.04301188 C4,1.50175979 4.43942184,1.06298828 4.98999023,1.06298828 C5.53674674,1.06298828 5.97998047,1.51091265 5.97998047,2.04301188 L5.97998047,4 L10.0200195,4 L10.0200195,2.04301188 C10.0200195,1.50175979 10.4594414,1.06298828 11.0100098,1.06298828 C11.5567663,1.06298828 12,1.51091265 12,2.04301188 L12,4 L13.9605924,4 C14.5295851,4 14.9908447,4.45784396 14.9908447,5.03149414 C14.9908447,5.60117262 14.5246782,6.06298828 13.9605924,6.06298828 L12,6.06298828 L12,10 L13.9605924,10 C14.5295851,10 14.9908447,10.457844 14.9908447,11.0314941 C14.9908447,11.6011726 14.5246782,12.0629883 13.9605924,12.0629883 L12,12.0629883 L12,14.0199764 C12,14.5612285 11.5605782,15 11.0100098,15 C10.4632533,15 10.0200195,14.5520756 10.0200195,14.0199764 L10.0200195,12.0629883 L5.97998047,12.0629883 L5.97998047,14.0199764 C5.97998047,14.5612285 5.54055863,15 4.98999023,15 C4.44323373,15 4,14.5520756 4,14.0199764 L4,12.0629883 L2.01023277,12.0629883 C1.44124014,12.0629883 0.979980469,11.6051443 0.979980469,11.0314941 C0.979980469,10.4618157 1.446147,10 2.01023277,10 L4,10 Z M5.97998047,10 L10.0200195,10 L10.0200195,6.06298828 L5.97998047,6.06298828 L5.97998047,10 Z"
    />
  </SvgIcon>
);

const CurrencyIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M12.389 2.079a1 1 0 0 1 .446.404A.967.967 0 0 1 13 3v1c0 .55-.45 1-1 1s-.95-1-1.5-1a.504.504 0 0 1-.5-.504v-.99c0-.291.226-.505.505-.505H12c.137 0 .268.029.389.079zM10 8.707V7.642c0-.28.204-.412.456-.303 0 0 2.544.87 2.544 3.217 0 2.359-2.531 3.145-2.531 3.145-.253.11-.469-.038-.469-.32v-1c0-.293.182-.634.407-.789 0 0 .593-.245.593-1.036 0-.761-.593-1.046-.593-1.046-.214-.172-.407-.526-.407-.802zM8 1c.556 0 1 .444 1 .99V14c0 .547-.448 1-1 1-.556 0-1-.448-1-1H4a.997.997 0 0 1-.706-.294A.993.993 0 0 1 3 13v-1c0-.55.45-1 1-1s1 1 2 1h1V9s-.427-.005-1-.128C4.815 8.617 3 7.845 3 5.5c0-2.36 1.815-3.126 3-3.377C6.573 2.003 7 2 7 2v-.003C7 1.453 7.448 1 8 1zM5 5.5c0 .76.5 1.135 1 1.32.5.185.999.18 1 .18V4c-.001 0-.5-.02-1 .156-.5.177-1 .552-1 1.344z"
    />
  </SvgIcon>
);

const PercentIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M3,14.25 C2.68,14.25 2.36,14.128 2.116,13.884 C1.628,13.396 1.628,12.604 2.116,12.116 L12.116,2.116 C12.604,1.628 13.396,1.628 13.884,2.116 C14.372,2.604 14.372,3.396 13.884,3.884 L3.884,13.884 C3.64,14.128 3.32,14.25 3,14.25 Z M15,12.2 C15,13.746 13.746,15 12.2,15 C10.654,15 9.4,13.746 9.4,12.2 C9.4,10.654 10.654,9.4 12.2,9.4 C13.746,9.4 15,10.654 15,12.2 Z M6.6,3.8 C6.6,5.346 5.346,6.6 3.8,6.6 C2.254,6.6 1,5.346 1,3.8 C1,2.254 2.254,1 3.8,1 C5.346,1 6.6,2.254 6.6,3.8 Z"
    />
  </SvgIcon>
);

const DurationIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M8,0 C12.418,0 16,3.582 16,8 C16,12.418 12.418,16 8,16 C3.582,16 0,12.418 0,8 C0,3.582 3.582,0 8,0 Z M8,2 C4.692,2 2,4.692 2,8 C2,11.308 4.692,14 8,14 C11.308,14 14,11.308 14,8 C14,4.692 11.308,2 8,2 Z M11.0093722,6.81393832 C11.1869056,6.80171574 11.3902483,6.8209993 11.5909071,6.89932646 C11.9980469,7.0582535 12.25,7.41593872 12.25,7.9707 C12.25,8.71905692 11.9405369,9.10504068 11.4133258,9.19533412 C11.2968713,9.21527884 11.206245,9.21916031 11.03169,9.21875075 C11.0154321,9.21871244 11.0154321,9.21871244 11,9.2187 L8.0298,9.2187 C7.3406155,9.2187 6.7808,8.65965826 6.78080752,7.97263915 L6.75,4 C6.75,3.19576788 7.03110947,2.75 8.0298,2.75 C8.77892842,2.75 9.15546292,3.06066987 9.23324737,3.59140329 C9.24887805,3.69805344 9.25158437,3.78155321 9.25031295,3.94283886 C9.25007528,3.97279143 9.25007528,3.97279143 9.25,4 L9.25,6.8157 L10.9877173,6.8157 C10.9925047,6.81529591 10.9991438,6.81476155 11.0093722,6.81393832 Z"
    />
  </SvgIcon>
);

const RatingIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M3.30691159,13.381144 C3.5448074,12.4109097 3.77718402,11.3274371 4.08378413,10.2654702 C4.2583045,9.66121488 4.13193425,9.26764006 3.62835641,8.88491329 C2.84786785,8.29207694 2.09516552,7.65489682 1.38966173,6.97527608 C1.15633352,6.75051213 0.934804947,6.28176223 1.017783,6.02426381 C1.10380613,5.75743988 1.54762454,5.48033885 1.86602428,5.43694665 C2.89906303,5.29630265 3.94542393,5.23616259 4.98873978,5.19486388 C5.50335598,5.1745 5.77836353,4.98798969 5.95764181,4.49221483 C6.30135367,3.54196383 6.67837094,2.59818359 7.12694727,1.69417954 C7.2828166,1.37996676 7.69637467,0.99305302 7.98337217,1.00009474 C8.28235961,1.00751708 8.67916981,1.39462114 8.84208086,1.71359183 C9.24326835,2.49902862 9.60011205,3.32119652 9.85190097,4.16544115 C10.0926515,4.97219341 10.569585,5.24168178 11.360541,5.25500394 C12.2451328,5.27003896 13.1352437,5.33436598 14.0084165,5.47101333 C14.3593604,5.52601484 14.9046175,5.79131624 14.945155,6.03111521 C15.0030113,6.37406581 14.7698734,6.87288573 14.4994334,7.14313536 C13.8295188,7.81228868 13.0848098,8.41083453 12.3368654,8.99510662 C11.8871472,9.34643115 11.7076786,9.67548862 11.9010403,10.2753667 C12.200789,11.2054441 12.4181306,12.1684463 12.5831351,13.1325905 C12.6428946,13.4820118 12.565055,14.0767513 12.3479038,14.197983 C12.0512001,14.3639391 11.4979496,14.3051313 11.1667987,14.1302303 C10.2460467,13.6435906 9.40408591,13.0083137 8.48523715,12.5176774 C8.20394916,12.3673272 7.70722271,12.3680885 7.42498313,12.5178677 C6.4766353,13.0210649 5.59546924,13.6493001 4.65949198,14.1779998 C3.95722357,14.5746197 3.32251756,14.2240564 3.30691159,13.381144"
    />
  </SvgIcon>
);

const FormulaIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M13.427,12.2326 L14.489,13.2946 C14.877,13.6826 14.877,14.3196 14.488,14.7086 C14.1,15.0976 13.463,15.0976 13.074,14.7086 L12.013,13.6476 L10.953,14.7086 C10.564,15.0976 9.928,15.0976 9.539,14.7086 L9.538,14.7076 C9.149,14.3196 9.149,13.6836 9.538,13.2946 L10.599,12.2326 L9.539,11.1726 C9.15,10.7836 9.15,10.1476 9.539,9.7586 C9.928,9.3696 10.564,9.3696 10.953,9.7586 L12.012,10.8176 L13.073,9.7556 C13.463,9.3656 14.099,9.3656 14.488,9.7546 L14.489,9.7556 C14.877,10.1446 14.877,10.7806 14.489,11.1696 L13.427,12.2326 Z M10.2468,0.0002 C12.87146,0.0002 13.3978592,2.53145 13.3978592,2.53145 C13.4839914,2.7844474 13.3156952,3.0002 13.0341343,3.0002 L11.756611,3.0002 C11.4754573,3.0002 11.1584611,2.7973017 11.0494895,2.54701396 C11.0494895,2.54701396 10.977478,2.0002 10.2468,2.0002 C9.4658,2.0002 9.2468,3.0002 9.2468,3.0002 L8.8468,5.0002 L9.2468,5.0002 L10.7468,5.0002 C11.0218,5.0002 11.2468,5.2252 11.2468,5.5002 C11.2468,5.7752 11.0218,6.0002 10.7468,6.0002 L9.2468,6.0002 L8.6468,6.0002 L7.2468,13.0002 C6.9348,14.3752 5.4968,16.0002 3.2468,16.0002 C1.2138,16.0002 0.5268,14.1722 0.3238,13.3702 C0.2748,13.1802 0.4208,13.0002 0.6168,13.0002 L1.74888936,13.0002 C2.02015548,13.0002 2.34410227,13.1978777 2.46413071,13.4417255 C2.46413071,13.4417255 2.59429932,14.0002 3.2468,14.0002 C4.0288,14.0002 4.2468,13.0002 4.2468,13.0002 L5.6468,6.0002 L5.2468,6.0002 L4.7468,6.0002 C4.4718,6.0002 4.2468,5.7752 4.2468,5.5002 C4.2468,5.2252 4.4718,5.0002 4.7468,5.0002 L5.2468,5.0002 L5.8468,5.0002 L6.2468,3.0002 C6.5598,1.6252 7.62214004,0.0002 10.2468,0.0002 Z"
    />
  </SvgIcon>
);

const CreatedTimeIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M14 7.937c-1.165.097-2.1.447-2.844.95V5.2c0-.11-.094-.2-.208-.2H9.792a.7.7 0 0 0-.521.24l-.854.964c-.146.15-.167.28-.167.44v.96c0 .2.23.28.354.16l.906-.844c.063-.06.198-.05.198.08v3.365c-.759 1.15-1.066 2.51-1.091 3.635H1.498A1.501 1.501 0 0 1 0 12.502V1.498C0 .671.675 0 1.498 0h11.004C13.329 0 14 .675 14 1.498v6.439zM2 1.5c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H2.49a.492.492 0 0 0-.49.5zm6 0c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H8.49a.492.492 0 0 0-.49.5zm-3.814 9.046c-.52 0-.853-.292-.853-.78V9.67a.193.193 0 0 0-.196-.188h-.94A.193.193 0 0 0 2 9.67v.094c0 1.158.98 2.061 2.186 2.061s2.186-.903 2.186-2.06c0-.519-.235-1.055-.617-1.356-.06-.047-.06-.113 0-.17.294-.31.52-.762.52-1.232 0-1.102-.932-1.977-2.089-1.977-1.147 0-2.098.875-2.098 1.977v.14c0 .104.088.189.196.189h.941a.193.193 0 0 0 .196-.188v-.141c0-.424.324-.697.765-.697.451 0 .765.273.765.697 0 .433-.314.715-.765.715H4.07a.193.193 0 0 0-.197.188v.885c0 .103.089.188.197.188h.117c.51 0 .853.292.853.781 0 .49-.343.781-.853.781zm9.279-.873v1.602c0 .274.227.497.507.497h.842c.28 0 .38.179.222.4L12.81 15.29c-.318.446-.582.369-.582-.181v-1.602a.502.502 0 0 0-.508-.497h-.842c-.28 0-.38-.18-.221-.4l2.227-3.118c.318-.446.582-.369.582.181z"
    />
  </SvgIcon>
);

const LastModifiedTimeIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M14 7.937c-1.165.097-2.1.447-2.844.95V5.2c0-.11-.094-.2-.208-.2H9.792a.7.7 0 0 0-.521.24l-.854.964c-.146.15-.167.28-.167.44v.96c0 .2.23.28.354.16l.906-.844c.063-.06.198-.05.198.08v3.365c-.759 1.15-1.066 2.51-1.091 3.635H1.498A1.501 1.501 0 0 1 0 12.502V1.498C0 .671.675 0 1.498 0h11.004C13.329 0 14 .675 14 1.498v6.439zM2 1.5c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H2.49a.492.492 0 0 0-.49.5zm6 0c0 .268.22.5.49.5h3.02c.275 0 .49-.224.49-.5a.5.5 0 0 0-.49-.5H8.49a.492.492 0 0 0-.49.5zm-3.814 9.046c-.52 0-.853-.292-.853-.78V9.67a.193.193 0 0 0-.196-.188h-.94A.193.193 0 0 0 2 9.67v.094c0 1.158.98 2.061 2.186 2.061s2.186-.903 2.186-2.06c0-.519-.235-1.055-.617-1.356-.06-.047-.06-.113 0-.17.294-.31.52-.762.52-1.232 0-1.102-.932-1.977-2.089-1.977-1.147 0-2.098.875-2.098 1.977v.14c0 .104.088.189.196.189h.941a.193.193 0 0 0 .196-.188v-.141c0-.424.324-.697.765-.697.451 0 .765.273.765.697 0 .433-.314.715-.765.715H4.07a.193.193 0 0 0-.197.188v.885c0 .103.089.188.197.188h.117c.51 0 .853.292.853.781 0 .49-.343.781-.853.781zm9.279-.873v1.602c0 .274.227.497.507.497h.842c.28 0 .38.179.222.4L12.81 15.29c-.318.446-.582.369-.582-.181v-1.602a.502.502 0 0 0-.508-.497h-.842c-.28 0-.38-.18-.221-.4l2.227-3.118c.318-.446.582-.369.582.181z"
    />
  </SvgIcon>
);

const CreatedBy = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M4.83111 3.74989C4.83111 5.26254 6.05735 6.48878 7.57 6.48878C9.08265 6.48878 10.3089 5.26254 10.3089 3.74989C10.3089 2.23724 9.08265 1.011 7.57 1.011C6.05735 1.011 4.83111 2.23724 4.83111 3.74989ZM11.5587 8.96358C10.5541 8.04076 9.12018 7.58434 7.57 7.58434C4.64852 7.58434 2 9.20545 2 12.5143C2 13.6696 3.73556 15.2054 7.57 15.2054C8.18699 15.2054 8.74602 15.1626 9.24976 15.0864C9.14489 14.6492 9.08934 14.1928 9.08934 13.7235C9.08934 11.7565 10.0649 10.0174 11.5587 8.96358Z M13.9095 11.2398V9.63783C13.9095 9.08783 13.6465 9.01083 13.3285 9.45683L11.1015 12.5748C10.9425 12.7948 11.0425 12.9748 11.3225 12.9748H12.1645C12.2305 12.974 12.296 12.9863 12.3573 13.0108C12.4186 13.0354 12.4744 13.0718 12.5216 13.118C12.5688 13.1641 12.6064 13.2191 12.6323 13.2799C12.6582 13.3406 12.6719 13.4058 12.6725 13.4718V15.0738C12.6725 15.6238 12.9365 15.7008 13.2545 15.2548L15.4805 12.1368C15.6385 11.9158 15.5385 11.7368 15.2585 11.7368H14.4165C14.1365 11.7368 13.9095 11.5138 13.9095 11.2398Z"
    />
  </SvgIcon>
);

const LastModifiedByIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M4.83111 3.74989C4.83111 5.26254 6.05735 6.48878 7.57 6.48878C9.08265 6.48878 10.3089 5.26254 10.3089 3.74989C10.3089 2.23724 9.08265 1.011 7.57 1.011C6.05735 1.011 4.83111 2.23724 4.83111 3.74989ZM11.5587 8.96358C10.5541 8.04076 9.12018 7.58434 7.57 7.58434C4.64852 7.58434 2 9.20545 2 12.5143C2 13.6696 3.73556 15.2054 7.57 15.2054C8.18699 15.2054 8.74602 15.1626 9.24976 15.0864C9.14489 14.6492 9.08934 14.1928 9.08934 13.7235C9.08934 11.7565 10.0649 10.0174 11.5587 8.96358Z M13.9095 11.2398V9.63783C13.9095 9.08783 13.6465 9.01083 13.3285 9.45683L11.1015 12.5748C10.9425 12.7948 11.0425 12.9748 11.3225 12.9748H12.1645C12.2305 12.974 12.296 12.9863 12.3573 13.0108C12.4186 13.0354 12.4744 13.0718 12.5216 13.118C12.5688 13.1641 12.6064 13.2191 12.6323 13.2799C12.6582 13.3406 12.6719 13.4058 12.6725 13.4718V15.0738C12.6725 15.6238 12.9365 15.7008 13.2545 15.2548L15.4805 12.1368C15.6385 11.9158 15.5385 11.7368 15.2585 11.7368H14.4165C14.1365 11.7368 13.9095 11.5138 13.9095 11.2398Z"
    />
  </SvgIcon>
);

const AutoNumberIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M5.583 11.406c.097-.107.248-.39.248-.577 0-.355-.24-.647-.638-.647-.444 0-.728.257-.728.647v.15c0 .098-.08.178-.177.178h-.843a.178.178 0 0 1-.177-.177v-.142c0-1.038.851-1.854 1.89-1.854 1.046 0 1.87.816 1.87 1.854 0 .488-.221.958-.55 1.313l-1.667 1.765c-.053.053-.062.177.089.177h1.96c.098 0 .177.08.177.177v.843c0 .097-.08.177-.177.177H3.383a.178.178 0 0 1-.177-.177v-1.047c0-.133.044-.186.08-.221l2.297-2.44zm-.835-4.327V2.825c0-.115-.115-.124-.168-.07l-.771.747c-.107.107-.302.036-.302-.142v-.85a.5.5 0 0 1 .142-.39l.727-.854a.587.587 0 0 1 .443-.213h.984c.097 0 .177.08.177.177v5.85c0 .097-.08.177-.177.177h-.878a.178.178 0 0 1-.177-.178zM12 12.5V2c0-.552-.444-1-1-1-.552 0-1 .45-1 1v10.5h-.508c-.548 0-.743.365-.424.831l1.365 2.001c.314.46.817.467 1.135 0l1.365-2c.313-.46.125-.832-.425-.832H12z"
    />
  </SvgIcon>
);

const ForeignKeyIcon = (props: SvgIconProps): JSX.Element => (
  <SvgIcon fontSize="small" viewBox="0 0 16 16" {...props}>
    <path
      fill="#949494"
      d="M4,9 L4,9.50097312 C4,9.89997312 4.445,10.1389731 4.777,9.91697312 L6.68301021,8.57583629 C7.13422121,8.25834813 7.1327641,7.74257283 6.68301021,7.42610994 L4.777,6.08497312 C4.445,5.86297312 4,6.10197312 4,6.50097312 L4,7.00194624 L0.997898413,7.00194624 C0.450942116,7.00194624 6.04355052e-25,7.44922581 0,8.00097312 C-6.08568505e-25,8.55656711 0.446774338,9 0.997898413,9 L4,9 Z M8,7.99902688 C8,7.44727957 8.43788135,7 9.00292933,7 L13.9970707,7 C14.5509732,7 15,7.44343289 15,7.99902688 C15,8.55077419 14.5621186,8.99805376 13.9970707,8.99805376 L9.00292933,8.99805376 C8.44902676,8.99805376 8,8.55462088 8,7.99902688 Z M2,13.0009731 C2,12.4492258 2.44748943,12.0019462 2.99850233,12.0019462 L14.0014977,12.0019462 C14.5529553,12.0019462 15,12.4453791 15,13.0009731 C15,13.5527204 14.5525106,14 14.0014977,14 L2.99850233,14 C2.44704472,14 2,13.5565671 2,13.0009731 Z M2,3.00097312 C2,2.44922581 2.44748943,2.00194624 2.99850233,2.00194624 L14.0014977,2.00194624 C14.5529553,2.00194624 15,2.44537912 15,3.00097312 C15,3.55272043 14.5525106,4 14.0014977,4 L2.99850233,4 C2.44704472,4 2,3.55656711 2,3.00097312 Z"
    />
  </SvgIcon>
);

const ColIcons = {
  text: TextIcon,
  multilineText: MultilineTextIcon,
  attachment: AttachmentIcon,
  checkbox: CheckboxIcon,
  select: SelectIcon,
  multiSelect: MultiSelectIcon,
  collaborator: CollaboratorIcon,
  date: DateIcon,
  phone: PhoneIcon,
  email: EmailIcon,
  url: URLIcon,
  decimal: NumberIcon,
  currency: CurrencyIcon,
  percent: PercentIcon,
  duration: DurationIcon,
  rating: RatingIcon,
  formula: FormulaIcon,
  createdTime: CreatedTimeIcon,
  lastModifiedTime: LastModifiedTimeIcon,
  createdBy: CreatedBy,
  lastModifiedBy: LastModifiedByIcon,
  autoNumber: AutoNumberIcon,
  foreignKey: ForeignKeyIcon,
} as const;

type ColumnHeaderIconProps = SvgIconProps & {
  type: string;
};

const ColumnHeaderIcon: FC<ColumnHeaderIconProps> = ({ type, sx, ...prop }) => {
  const IconComm = ColIcons[type as keyof typeof ColIcons];
  const isx = { ...sx, fontSize: '16px' };
  if (IconComm) return <IconComm {...prop} sx={isx} />;
  else return null;
};

export default memo(ColumnHeaderIcon);
