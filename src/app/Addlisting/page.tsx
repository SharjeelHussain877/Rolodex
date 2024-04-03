"use client";
import React, { useEffect, useRef, useState } from "react";
import BusinessHours from "./businessHours";
import NavBar from "@/components/Header/header";
import Footer from "@/components/footer/footer";
import Navigation from "@/components/ui/navigation";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import Contactdetail from "./contactdetail";
import ProgressBar from "@/components/ui/progressbar";
import CheckmarkIcon from "@/components/icons/tickmark";
import axios from "axios";
import { Api } from "@/utils/api";
import { ToastContainer, toast } from "react-toastify";
import { GetUser } from "@/components/userToken";
import Loader from "@/components/loader";
import { BasicInfo } from "./basic_info";
import Location from "./location";
import More from "./more";
import AddPhoto from "./AddPhoto";

function Page() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const [underline, setUnderline] = useState("about");
  const [draftID, setdraftID] = useState(null);

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    axios.get(Api + "/ads/draft").then((data:any) => {
     
      setdraftID(data)
    });
    const handleScroll = () => {
      const aboutOffset = aboutRef.current?.offsetTop;
      const locationOffset = locationRef.current?.offsetTop;
      const hourOffset = hourRef.current?.offsetTop;
      const contactOffset = contactRef.current?.offsetTop;
      const moreOffset = moreRef.current?.offsetTop;
      const scrollPosition = window.scrollY;

      if (
        aboutOffset !== undefined &&
        locationOffset !== undefined &&
        scrollPosition >= aboutOffset &&
        scrollPosition < locationOffset
      ) {
        setUnderline("about");
      } else if (
        locationOffset !== undefined &&
        hourOffset !== undefined &&
        scrollPosition >= locationOffset &&
        scrollPosition < hourOffset
      ) {
        setUnderline("location");
      } else if (
        hourOffset !== undefined &&
        contactOffset !== undefined &&
        scrollPosition >= hourOffset &&
        scrollPosition < contactOffset
      ) {
        setUnderline("hour");
      } else if (
        contactOffset !== undefined &&
        moreOffset !== undefined &&
        scrollPosition >= contactOffset &&
        scrollPosition < moreOffset
      ) {
        setUnderline("contact");
      } else if (moreOffset !== undefined && scrollPosition >= moreOffset) {
        setUnderline("more");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [days, setDays] = useState<any>([
    {
      day: "Monday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
    {
      day: "Tuesday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
    {
      day: "Wednesday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
    {
      day: "Thursday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
    {
      day: "Friday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
    {
      day: "Saturday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
    {
      day: "Sunday",
      isChecked: false,
      timing: [
        {
          openingHours: "",
          closingHours: "",
        },
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const [err, setImageError] = useState(false);

  const Ad_STATUS = {
    PUBLISHED: "published",
    DRAFT: "draft",
    DEACTIVATE: "de_activated",
  };

  useEffect(() => {
    setIsLoading(false);
  }, [days]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_id: GetUser()?._id,
      products: [
        {
          product_name: "",
          product_description: "",
          product_category: "",
          product_price: "",
          product_url: "",
          product_category2: "",
          image: "",
        },
      ],
      business_name: "",
      category: [],
      company_type: "",
      location: "",
      business_card_image: "",
      images: "",
      country: "",
      city: "",
      gallery_Image: "",
      input_Location: "",
      location_type: "",
      description: "",
      businessHours: days,
      email: "",
      phone: "",
      service: "",
      web: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      timeshipt: "",
      accessibilty: "",
      amenties: "",
      plannig: "",
      serviceOption: "",
      status: Ad_STATUS.PUBLISHED,
    },
  });

  const addProduct = (product: any) => {
    const productLength: number = getValues().products.length;
    product['busniess_id'] = draftID.id
// need to call api for creating product
  axios.post(Api + "/products/create", product);
   
  };

  console.log(getValues());

  const onSubmit = async (data: any) => {
    console.log("successfully submit", data);

    if (data.business_card_image.trim() === "") {
      setError("business_card_image", {
        type: "required",
        message: "Business card is required",
      });
      return;
    }
    if (data.category.length === 0) {
      setError("category", {
        type: "manual",
        message: "Category is required",
      });
      return;
    }

    if (data.businessHours) {
      data.businessHours = days;
    }
    if (data.country.trim() === "") {
      setError("country", {
        type: "manual",
        message: "Country is required",
      });
    }
    if (data.location.trim() === "") {
      setError("location", {
        type: "manual",
        message: "Location is required",
      });
    }

    if (data.images.trim() === "") {
      setError("images", {
        type: "manual",
        message: "image is required",
      });
    }
    if (data.city.trim() === "") {
      setError("city", {
        type: "manual",
        message: "City is required",
      });
    }

    if (data.accessibilty.trim() === "") {
      setError("accessibilty", {
        type: "manual",
        message: "accessibilty is required",
      });
    }

    data.location = ` ${data.city} ${data.country} `;
    delete data.images;
    delete data.city;
    delete data.country;
    if (getValues().city && getValues().country && getValues().category) {
      try {
        const response = await axios.post(Api + "/ads/create", data);
        toast.success("Successfully created", {
          autoClose: 2000,
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>
  // ) => {
  //   const selectedFile = event?.target?.files?.[0];

  //   if (selectedFile) {
  //     try {
  //       if (!selectedFile.type.startsWith("image/")) {
  //         throw new Error("Invalid file type. Please upload an image.");
  //       }

  //       const formData = new FormData();
  //       formData.append("profile_pic", selectedFile);

  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         const dataUrl = reader?.result as string;
  //         setValue("images", dataUrl);
  //         setSelectedImage(dataUrl);
  //       };

  //       reader.readAsDataURL(selectedFile);
  //     } catch (error) {
  //       console.error("Error handling file change:");
  //     }
  //   }
  // };

  // const updateDropdownValue = (name: any, selectedOption: any) => {
  //   if (selectedOption.name) {
  //     setValue(name, selectedOption._id);
  //   } else {
  //     setValue(name, selectedOption);
  //   }
  //   clearErrors(name);
  // };

  const updateDropdownValue = (name: any, selectedOption: any) => {
    const selectedValues = Array.isArray(selectedOption)
      ? selectedOption.map((option) => option._id || option)
      : selectedOption._id || selectedOption;
    setValue(name, selectedValues);
    clearErrors(name);
  };

  const calculateProfileCompletion = (fields: any) => {
    const totalFields = 19;
    delete fields?.user_id;
    if (fields) {
      const filterdata = Object.values(fields).filter((items: any) => items);
      const completionPercentage = (filterdata?.length / totalFields) * 100;
      return Math.floor(completionPercentage);
    }
  };
  const percentageComplete = calculateProfileCompletion(getValues());
  if (isLoading) {
    return (
      <div className="h-screen  flex items-center justify-center ">
        <Loader />
      </div>
    );
  }

  return (
    <main>
      <NavBar />
      <div className="max-w-[1240px]  mx-auto mb-40 p-4 xl:p-0">
        <Navigation title1={"Home"} title2={"Add listing"} />

        <div className="xl:flex flex-wrap justify-center hidden rounded-lg pt-5 pb-5 w-full sticky top-0 shadow-md bg-white z-10 xl:w-4/6 xl:gap-10">
          <div className="xl:flex flex-wrap justify-center xl:gap-10">
            <h1
              className={`text-sm font-bold cursor-pointer sm:text-sm ${
                underline === "about" ? "border-b-2 border-[#25AEE1] " : ""
              } `}
              onClick={() => {
                scrollToRef(aboutRef);
                setTimeout(() => {
                  setUnderline("about");
                }, 1000);
              }}
            >
              About
            </h1>
            <h1
              className={`text-sm font-bold cursor-pointer sm:text-sm ${
                underline === "location" ? "border-b-2 border-[#25AEE1] " : ""
              } `}
              onClick={() => {
                scrollToRef(locationRef);
                setTimeout(() => {
                  setUnderline("location");
                }, 1000);
              }}
            >
              Location
            </h1>
            <h1
              className={`text-sm font-bold cursor-pointer sm:text-sm ${
                underline === "hour" ? "border-b-2 border-[#25AEE1] " : ""
              } `}
              onClick={() => {
                scrollToRef(hourRef);
                setTimeout(() => {
                  setUnderline("hour");
                }, 1000);
              }}
            >
              Hour
            </h1>
            <h1
              className={`text-sm font-bold cursor-pointer sm:text-sm ${
                underline === "contact" ? "border-b-2 border-[#25AEE1] " : ""
              } `}
              onClick={() => {
                scrollToRef(contactRef);
                setTimeout(() => {
                  setUnderline("contact");
                }, 1000);
              }}
            >
              Contact Me
            </h1>
            <h1
              className={`text-sm font-bold cursor-pointer sm:text-sm ${
                underline === "more" ? "border-b-2 border-[#25AEE1] " : ""
              } `}
              onClick={() => {
                scrollToRef(moreRef);
                setTimeout(() => {
                  setUnderline("more");
                }, 1000);
              }}
            >
              More
            </h1>
          </div>
        </div>

        <div className="sm:grid sm:grid-cols-3 flex flex-col-reverse gap-4 ">
          <form onSubmit={handleSubmit(onSubmit)} className="col-span-2 mt-4">
            <div ref={aboutRef}>
              <BasicInfo
                watch={watch}
                register={register}
                getValues={getValues}
                setValue={setValue}
                errors={errors}
                err={err}
                draftId={draftID}
                addProduct={addProduct}
                // addCategories={addCategories}
                updateDropdownValue={updateDropdownValue}
              />
            </div>
            <AddPhoto errors={errors} setValue={setValue} />
            <div ref={locationRef}>
              <Location
                watch={watch}
                Values={getValues}
                register={register}
                errors={errors}
                setValue={setValue}
              />
            </div>
            <div
              ref={hourRef}
              className="flex flex-col space-y-6 rounded-lg shadow-md p-6 mt-12"
            >
              <BusinessHours
                days={days}
                setDays={setDays}
                // businessHoursHandler={businessHoursHandler}
              />
            </div>

            <div ref={contactRef}>
              <Contactdetail register={register} errors={errors} />
            </div>

            <div ref={moreRef}>
              <More setValue={setValue} />
            </div>

            {/* <div className="flex gap-4 mt-20">
              <Button type={"submit"} className={"!px-12   !rounded-full"}>
                Save
              </Button>
            </div> */}
          </form>
          <div className="col-span-1 mt-4">
            <h1 className="text-base md:text-xl font-semibold mb-3">
              {percentageComplete} % content filled
            </h1>
            <ProgressBar
              progress={percentageComplete}
              className={"bg-[#F23C49]"}
            />
            <div className="space-y-4 mt-4">
              {[
                "Basic info",
                "Location",
                "Description",
                "Timing",
                "Photos",
                "Contact details",
              ].map((items, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <CheckmarkIcon items={items} getValues={getValues} />
                  <p
                    className={`font-semibold  text-gray-500
                                     ${
                                       items === "Basic info" &&
                                       getValues().business_name &&
                                       getValues().category &&
                                       getValues().company_type
                                         ? "text-primary"
                                         : items === "Location" &&
                                           getValues().country &&
                                           getValues().city
                                         ? "text-primary"
                                         : items === "Photos / video" &&
                                           getValues().images
                                         ? "text-primary"
                                         : items === "Description" &&
                                           getValues().description
                                         ? "text-primary"
                                         : //  : items === "Timing" &&
                                         //    getValues().opening_time &&
                                         //    getValues().closing_time
                                         //  ? "text-primary"
                                         items === "Timing" &&
                                           getValues().businessHours.length > 0
                                         ? "text-primary"
                                         : items === "Contact details" &&
                                           getValues().email &&
                                           getValues().phone
                                         ? "text-primary"
                                         : "text-black"
                                     }`}
                  >
                    {items}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer />
    </main>
  );
}

export default Page;
