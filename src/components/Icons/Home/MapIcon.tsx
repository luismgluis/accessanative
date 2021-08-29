import * as React from "react";
import Svg, { G, Path, SvgProps } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: link, style */
const MapIcon: React.FC<SvgProps> = (props) => {
  const color = props.color || "#818181";
  return (
    <Svg width={512} height={512} viewBox="0 0 512 512" {...props}>
      <G fill={color}>
        <Path d="M487.43 166.74A43.068 43.068 0 00488 160a72.1 72.1 0 00-44.8-66.65 248.155 248.155 0 00-299.28-58.64A71.965 71.965 0 0016 80c0 13.35 7.54 32.42 22.45 56.83a247.994 247.994 0 10448.98 29.91zM472 160a32.743 32.743 0 01-.61 5.82c-.02.07-.03.16-.05.24-4.89 25.51-36.98 70.13-55.34 93.25-19.91-25.07-56-75.45-56-99.31a56 56 0 01112 0zM32 80a56 56 0 01112 0c0 23.86-36.09 74.24-56 99.31C68.09 154.24 32 103.86 32 80zm26.34 290.34a7.978 7.978 0 00-2.07 3.68 232.174 232.174 0 01-7.86-221.71c.32.48.64.95.97 1.44 16.04 23.64 31.82 42.58 32.48 43.38a8 8 0 0012.28 0c.66-.8 16.44-19.74 32.48-43.38q1.6-2.37 3.13-4.68l6.25 6.24v17.38l-5.66 5.65a8.015 8.015 0 000 11.32l24 24a7.953 7.953 0 003.13 1.93l20.21 6.73 5.89 17.68-6.98 20.93-5.53 11.07H152a8.081 8.081 0 00-3.58.84l-48 24a8.007 8.007 0 00-2.08 12.82L120 331.31v9.38l-12.74 12.73L96 359.06l-12.42-6.22a8.034 8.034 0 00-9.24 1.5zM256 488a232.224 232.224 0 01-56.3-6.91l18.19-9.09H240a8.081 8.081 0 003.58-.84l16-8a8.356 8.356 0 002.08-1.5l6.66-6.67 17.52-5.84 12.5 12.51A8.008 8.008 0 00304 464h16a8.008 8.008 0 005.66-2.34L344 443.31l10.34 10.35a8.11 8.11 0 002.08 1.5l10 4.99A230.863 230.863 0 01256 488zm164.05-67.95a234.355 234.355 0 01-37.33 30.36l-17.98-8.99-15.08-15.08a8.015 8.015 0 00-11.32 0L316.69 448h-9.38l-13.65-13.66a8.007 8.007 0 00-8.19-1.93l-24 8a7.953 7.953 0 00-3.13 1.93l-7.08 7.08-13.15 6.58H216a8.081 8.081 0 00-3.58.84l-34.96 17.49A231.864 231.864 0 0180 407.13V392a8.081 8.081 0 00-.84-3.58l-5.43-10.84 7.85-7.85 10.84 5.43a8.049 8.049 0 007.16 0l16-8a8.356 8.356 0 002.08-1.5l16-16A8.008 8.008 0 00136 344v-16a8.008 8.008 0 00-2.34-5.66l-16-16-.16-.15L153.89 288H176a8.011 8.011 0 007.16-4.42l8-16a7.979 7.979 0 00.43-1.05l8-24a7.965 7.965 0 000-5.06l-8-24a8.013 8.013 0 00-5.06-5.06l-22.21-7.4L147.31 184l2.35-2.34A8.008 8.008 0 00152 176v-24a8.008 8.008 0 00-2.34-5.66l-11.13-11.13C152.78 111.58 160 93.05 160 80a71.618 71.618 0 00-7.39-31.74 232.273 232.273 0 01190.65-7.23l-51.5 32.19a7.992 7.992 0 00-3.35 9.31l6.95 20.86-6.52 13.03a8.052 8.052 0 00-.43 6.11l8 24a7.979 7.979 0 00.43 1.05l6.22 12.42-5.64 11.26-7.08 7.08A8.008 8.008 0 00288 184v14.7l-6.72 20.17-21.3 14.2-15.56 7.77a8.006 8.006 0 00-4.01 4.63l-8 24A8.074 8.074 0 00232 272v8a8.081 8.081 0 00.84 3.58l8 16a8.006 8.006 0 004.63 4.01l24 8a8.069 8.069 0 003.96.28l83.88-15.25 13.03 13.04a8.023 8.023 0 007.6 2.1l27.61-6.9 4.79 4.8a8.356 8.356 0 002.08 1.5l14.84 7.42 7.08 7.08a8.034 8.034 0 009.24 1.5l14.31-7.16h2.8l4.96 4.96 7.62 12.7a231.275 231.275 0 01-53.22 82.39zm58.81-104.17a8.5 8.5 0 00-1.2-1.54l-8-8A8.008 8.008 0 00464 304h-8a8.081 8.081 0 00-3.58.84l-10.84 5.43-3.92-3.93a8.356 8.356 0 00-2.08-1.5l-14.84-7.42-7.08-7.08a8.023 8.023 0 00-7.6-2.1l-27.61 6.9-12.79-12.8a8.024 8.024 0 00-7.09-2.21l-85.99 15.63-18.91-6.3-5.67-11.35v-4.81l6.54-19.63 13.04-6.51c.29-.15.58-.32.86-.5l24-16a8 8 0 003.15-4.13l8-24A8.074 8.074 0 00304 200v-12.69l5.66-5.65a8.356 8.356 0 001.5-2.08l8-16a8.049 8.049 0 000-7.16l-7.75-15.49-6.77-20.32 6.52-13.03a8.052 8.052 0 00.43-6.11l-6.01-18.02 55.15-34.47A232.354 232.354 0 01415.99 88 72.081 72.081 0 00344 160c0 16.29 11.23 41.1 33.38 73.75 16.04 23.64 31.82 42.58 32.48 43.38a8 8 0 0012.28 0c.66-.8 16.44-19.74 32.48-43.38q16.065-23.685 24.43-41.79a234.131 234.131 0 01.76 125.5z" />
        <Path d="M224 376h-20.687l-13.656-13.657A8 8 0 00184 360h-16a8 8 0 00-7.155 4.422l-16 32a8 8 0 000 7.156l8 16a8 8 0 004.625 4.012l24 8a8 8 0 009.685-4.012l4.9-9.795 17.417 5.807a8 8 0 008.187-1.933l8-8A8 8 0 00232 408v-24a8 8 0 00-8-8zm-8 28.687l-2.161 2.16-19.309-6.437a8 8 0 00-9.685 4.012l-4.9 9.795-14.273-4.759-4.728-9.458 12-24h7.743l13.656 13.657A8 8 0 00200 392h16zM392 160a24 24 0 1024-24 24.028 24.028 0 00-24 24zm32 0a8 8 0 11-8-8 8.009 8.009 0 018 8zM112 80a24 24 0 10-24 24 24.028 24.028 0 0024-24zm-32 0a8 8 0 118 8 8.009 8.009 0 01-8-8z" />
      </G>
    </Svg>
  );
};
export default MapIcon;