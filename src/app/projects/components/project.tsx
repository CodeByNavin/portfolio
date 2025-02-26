"use client";
import Image from 'next/image';

export default function Project({
    data,
}: {
    data: any;
}) {
    console.log(data);
    return (
        <div className="flex flex-col items-center relative pt-5 px-6 max-w-[600px]">
            {/* Red corner divs are now inside this container, relative to it */}
            <div className="absolute w-1 h-12 top-0 left-0 bg-red-500" />
            <div className="absolute w-1 h-12 -top-6 left-[1.25rem] translate-x-1/2 bg-red-500 rotate-90" />
            <Image
                src={data.image?.data ? `${data.image.data}` : '/NoImage.png'}
                alt={`${data.image?.name}` || "No Image"}
                width={data.image?.width > 800 ? data.image?.width / 2 : data.image?.width || 800}
                height={data.image?.height > 400 ? data.image?.height / 2 : data.image?.height || 300}
                className="rounded p-3 w-auto max-h-[400px] max-w-[600px]"
            />
            <h1 className=" text-xl font-semibold text-white flex flex-row items-center gap-2">
                {data.title}
                <span className="text-xs text-white/50">{' - '}{data.timeline}</span>
            </h1>
            <p className='pt-2 text-center sm:text-left'>
                {data.description}
            </p>
            <div className="pt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full">
                {data.frameworks && data.frameworks.length !== 0 && data.frameworks.map((value: string, index: number) => (
                    <div key={index} className="flex items-center" >
                        <Image
                            src={`/${value}`}
                            alt={value}
                            width={30}
                            height={30}
                        />
                        <span className="pl-2 self-center text-sm md:text-base">
                            {value.charAt(0).toUpperCase() + value.slice(1).split('.')[0]}
                        </span>
                    </div>
                ))}
            </div>

            {/* Red corner divs at the bottom of the project container */}
            <div className="absolute w-1 h-12 bottom-0 -right-1 bg-red-500" />
            <div className="absolute w-1 h-12 -bottom-6 right-[1.25rem] translate-x-1/2 bg-red-500 rotate-90" />
        </div >
    );
}
