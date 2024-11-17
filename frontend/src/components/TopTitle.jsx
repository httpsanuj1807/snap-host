export default function TopTitle({title, subHeading}){

    return (
        <div className="p-12 pb-6 text-center md:text-left">
        <p className="text-4xl  lg:text-5xl font-bold text-gray-900">
          {title}
        </p>
        <p className="py-2 px-4 md:px-0 sm text-sm lg:text-base font-mono text-slate-600">
          {subHeading}
        </p>
        
      </div>
    )

}