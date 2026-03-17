"use client";
import { useRouter } from "next/navigation";
import { useAddProjectMutation, useGetProjectsQuery } from "./services/api";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-3.5 h-3.5 ${filled ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function Home() {
  const { data, error, isLoading } = useGetProjectsQuery();
  const router = useRouter();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();

  const handleAddProject = async () => {
    try {
      await addProject({
        title: "New Premium Product",
        description: "Experience the ultimate luxury with our latest high-performance addition.",
        price: 129.99,
        discountPercentage: 12,
        rating: 4.8,
        stock: 50,
        brand: "Premium",
        category: "Luxury",
        thumbnail: "https://dummyjson.com/product-thumbnail.jpg",
      }).unwrap();
      alert("Product added successfully!");
    } catch (err) {
      console.error("Failed to add product:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFBFE] text-gray-900 font-sans selection:bg-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-gray-900 mb-6">
              Modern <span className="text-indigo-600">Collection.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed">
              Carefully curated essentials designed for the modern lifestyle.
              Quality craftsmanship meets contemporary design.
            </p>
          </div>

          <button
            disabled={isAdding}
            onClick={handleAddProject}
            className="group flex items-center justify-center gap-3 bg-white border-2 border-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:opacity-50"
          >
            {isAdding ? "Processing..." : "Add New Product"}
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </header>

        {/* Loading UI */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 rounded-[2rem] bg-gray-100 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-100 p-6 rounded-3xl flex items-center gap-4 text-rose-700">
            <span className="text-2xl">⚠️</span>
            <p className="font-medium italic">We couldn't load the products. Please try again later.</p>
          </div>
        )}

        {/* Product Grid */}
        {data?.products && (
          <div className="grid grid-cols-1 gap-y-16 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.products.map((product: any) => (
              <div
                key={product.id}
                onClick={() => router.push(`/${product.id}`)}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Card */}
                <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-[2.5rem] bg-gray-100 border border-transparent group-hover:border-gray-200 transition-all duration-500 shadow-sm">
                  <img
                    src={product.thumbnail || product.images?.[0]}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay Badges */}
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    {product.discountPercentage > 10 && (
                      <span className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                        {Math.round(product.discountPercentage)}% Off
                      </span>
                    )}
                    <span className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm w-fit">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Info Section */}
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg shadow-sm border border-gray-100">
                      <StarIcon filled={true} />
                      <span className="text-xs font-bold">{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-gray-900">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}