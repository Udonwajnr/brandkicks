import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { useAuth } from "@/app/context/context"

export default function NewProductsPage() {
  const {product} = useAuth()
  return (
    <main className="bg-white">
      {/* New Products Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-lime-400 inline-block px-4 py-1">NEW PRODUCTS</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {
            product.slice(0,4).map((product, i) => (
              <div key={i} className="relative group">
                <button className="absolute top-2 right-2 z-10">
                  <Heart className="h-5 w-5" />
                </button>
                <Link href={`/product/${i + 1}`} className="block">
                  <div className="relative h-[360px] mb-2 bg-gray-50 p-4">
                    <Image
                      src={`${product.images[0]}`}
                      alt={product.name}
                      width={180}
                      height={180}
                      className=" w-full h-full"
                    />
                  </div>
                  <div className="text-xs uppercase mb-1">{product.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-red-600 font-bold">$ {product.price}</div>
                    <button className="bg-gray-100 rounded-full p-1 flex items-center justify-center w-6 h-6">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 5V19M5 12H19"
                          stroke="black"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Whom You Choose Section */}
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">FOR WHOM YOU CHOOSE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative bg-gray-100">
              <Image
                src="/man.jpg"
                alt="Man in teal outfit with sneakers"
                width={400}
                height={400}
                className=" h-full w-full"
              />
              <div className="absolute bottom-4 left-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.5 4.5L21 12L13.5 19.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M21 12H3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative  bg-gray-100">
              <Image
                src="/test.jpg"
                alt="Woman in red jacket with sneakers"
                width={400}
                height={400}
                className=" h-full w-full"
              />
              <div className="absolute bottom-4 left-4">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.5 4.5L21 12L13.5 19.5"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M21 12H3" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-4 border-t">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="text-sm uppercase">brandedkicks</div>
          <div className="flex items-center space-x-4">
            <Link href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M17.5 6.5H17.51" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

