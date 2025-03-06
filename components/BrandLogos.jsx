import Image from "next/image"
export default function BrandLogo(){
    return(
        <>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 py-6 border-t border-b">
            {["/nike.webp", "/aasics.png", "/adidas.png", "/puma.png", "/reebok.png", "/columbia.png"].map((brand,index) => (
              <div key={index} className="flex items-center justify-center p-2 border">
                <Image src={brand}/>
              </div>
            ))}
          </div>
        </>
    )
}