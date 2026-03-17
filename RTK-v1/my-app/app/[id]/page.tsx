"use client";

import { useGetProjectByIdQuery, useUpdateProjectMutation, useDeleteProjectMutation } from "../services/api";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

export default function GetProductById() {
    const params = useParams();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState("");

    const projectId = useMemo(() => {
        const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
        return rawId ? Number(rawId) : NaN;
    }, [params?.id]);

    const { data, error, isLoading, isFetching } = useGetProjectByIdQuery(projectId, {
        skip: isNaN(projectId),
    });

    const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
    const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

    // Sync title state when data loads or editing starts
    useEffect(() => {
        if (data) setTitle(data.title);
    }, [data, isEditing]);

    const handleUpdate = async () => {
        try {
            await updateProject({ id: projectId, patch: { title } }).unwrap();
            setIsEditing(false);
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this masterpiece?")) {
            await deleteProject(projectId);
            router.push("/");
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF]">
            <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
        </div>
    );

    if (error || !data) return <div className="text-center py-20 font-medium text-gray-400">Product vanished into the void...</div>;

    return (
        <main className="min-h-screen bg-[#F8F9FB] text-[#1A1A1A] selection:bg-indigo-100">
            <div className="max-w-7xl mx-auto px-6 py-12">

                {/* Top Navigation Bar */}
                <div className="flex justify-between items-center mb-16">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600 transition-all"
                    >
                        <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </div>
                        Back
                    </button>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-tighter transition-all border-2 ${isEditing ? "border-rose-500 text-rose-500 bg-rose-50" : "border-gray-900 bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
                                }`}
                        >
                            {isEditing ? "Discard Changes" : "Modify Details"}
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-2.5 rounded-2xl border-2 border-transparent hover:border-rose-200 hover:bg-rose-50 text-gray-300 hover:text-rose-500 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-16 transition-all duration-700 ${isFetching || isUpdating || isDeleting ? 'opacity-40 grayscale pointer-events-none' : 'opacity-100'}`}>

                    {/* Image Section (Span 7) */}
                    <div className="lg:col-span-7 relative group">
                        <div className="sticky top-12 aspect-square rounded-[4rem] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center p-20 overflow-hidden border border-gray-50">
                            <img
                                src={data.images?.[0] || data.thumbnail}
                                alt={data.title}
                                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-1000 ease-out"
                            />
                            {/* Visual flair: Abstract blob background */}
                            <div className="absolute -z-10 w-[80%] h-[80%] bg-gradient-to-tr from-indigo-50 to-rose-50 rounded-full blur-3xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Content Section (Span 5) */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <div className="max-w-md">
                            {isEditing ? (
                                <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500">Global Registry Title</label>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="w-full text-4xl font-black bg-transparent border-b-4 border-gray-900 focus:border-indigo-600 outline-none pb-2 transition-colors"
                                            placeholder="Enter new title..."
                                        />
                                    </div>
                                    <button
                                        onClick={handleUpdate}
                                        className="w-full py-5 bg-indigo-600 text-white font-bold rounded-3xl hover:bg-indigo-700 shadow-[0_20px_40px_rgba(79,70,229,0.3)] hover:translate-y-[-2px] active:translate-y-0 transition-all"
                                    >
                                        {isUpdating ? "Syncing..." : "Confirm Update"}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-500">
                                    <header>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                                                {data.category}
                                            </span>
                                            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest italic">
                                                ID: #{data.id}
                                            </span>
                                        </div>
                                        <h1 className="text-5xl sm:text-6xl font-black text-gray-900 leading-[0.95] tracking-tighter mb-6">
                                            {data.title}
                                        </h1>
                                        <div className="flex items-center gap-6">
                                            <p className="text-4xl font-light text-gray-900">${data.price}</p>
                                            <div className="h-8 w-[1px] bg-gray-200"></div>
                                            <p className="text-sm font-bold text-rose-500 uppercase tracking-tighter">{Math.round(data.discountPercentage)}% Exclusive Discount</p>
                                        </div>
                                    </header>

                                    <p className="text-lg text-gray-500 leading-relaxed font-medium">
                                        {data.description}
                                    </p>

                                    <div className="space-y-4">
                                        <button className="w-full py-6 bg-gray-900 text-white rounded-3xl font-black text-lg hover:shadow-2xl transition-all active:scale-[0.98]">
                                            Secure Checkout
                                        </button>
                                        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            Free Express Shipping Worldwide
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}