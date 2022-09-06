import Image from "next/image";
import React from "react";

function blogDetails() {
  return (
    <div className="container my-8">
      <div className="">
        <span className="text-white text-3xl font-bold">Blog Details</span>
        <div className="flex flex-col gap-x-10 gap-y-4 mt-8">
          <p className="text-white text-3xl font-extrabold">
            Videos releases Car drive
          </p>
          <span className="text-[#acacac]">10 may, 2021</span>
          <Image src="/design4.webp" alt="design_7" height={400} width={400} />
          <p className="text-[#acacac]">
            Nobis eleifend option conguenes. Mauris tempor, orci id pellentesque
            convallis, massa mi congue eros, sed posuere massa nunc quis dui.
            Integer ornare varius mi, in vehicula orci scelerisque sed. Fusce a
            massa nisi. Curabitur sit amet suscipit nisl. Sed eget nisl laoreet,
            suscipit enim nec, viverra eros. Nunc imperdiet risus leo, in rutrum
            erat dignissim id.
          </p>
        </div>
      </div>
    </div>
  );
}

export default blogDetails;
