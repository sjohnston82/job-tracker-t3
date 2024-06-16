import React from "react";
import Image from "next/image";
import OrganizePic from "../../../../public/images/organize.webp";
import AnalyzePic from "../../../../public/images/analyze.webp";
import MaterialsOrganizerPic from "../../../../public/images/application-materials-organizer.webp";

const Features = () => {
  return (
    <div id="features" className="">
      <section className="flex flex-col items-center justify-center gap-12 bg-slate-300 py-12">
        <p className="text-center font-basic text-3xl font-bold">Organize</p>
        <Image
          src={OrganizePic}
          width={300}
          height={300}
          alt="Organization"
          className="rounded-[4rem]"
        />
        <p className="px-8 text-center font-basic font-semibold">
          Our platform provides powerful organization tools to streamline your
          job search. Effortlessly categorize applications by status, position,
          age, or company, ensuring nothing is overlooked.{" "}
        </p>
      </section>

      <section className="flex flex-col items-center justify-center gap-12  py-12">
        <p className="text-center font-basic text-3xl font-bold">Analyze</p>
        <Image
          src={AnalyzePic}
          width={300}
          height={300}
          alt="Analyze"
          className="rounded-[4rem]"
        />
        <p className="px-8 text-center font-basic font-semibold">
          Use our analytics dashboard to easily see the raw numbers of your job
          search, such as number of applications, conversion rates and more.
        </p>
      </section>

      <section className="flex flex-col items-center justify-center gap-12 bg-slate-300 py-12">
        <p className="text-center font-basic text-3xl font-bold">
          Application Materials Organizer
        </p>
        <Image
          src={MaterialsOrganizerPic}
          width={300}
          height={300}
          alt="Application Materials Organizer"
          className="rounded-[4rem]"
        />
        <p className="px-8 text-center font-basic font-semibold">
          Take notes and easily upload and store important documents such as
          cover letters and resumes for each application.
        </p>
      </section>
    </div>
  );
};

export default Features;
