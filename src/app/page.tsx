"use client"
import Image from "next/image";

import Component from '../components/component';
import Mylayout from '../components/Mylayout';

const Page = () => {
  return (
      <div>
          <Mylayout />
        <Component />
      </div>
  );
};

export default Page;
