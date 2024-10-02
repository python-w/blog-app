"use client";

import { ProgressBar } from "react-loader-spinner";

export default function Spinner() {
  return <ProgressBar height={120} width={120} borderColor="#000" barColor="#fff" ariaLabel="Common Loader" wrapperStyle={{display: 'block', margin: 'auto'}}/>;
}
