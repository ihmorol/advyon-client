import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useCasesStore } from '@/store/cases';

const CreateCaseModal = ({ onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        ref: '',
        type: 'Criminal Defense'
    });
    const { createCase, isLoading: isMutating } = useCasesStore();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const newCase = await createCase(formData);
            if (onSuccess) onSuccess(newCase);
            onClose();
        } catch (err) {
            console.error("Failed to create case:", err);
            setError("Failed to create case. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-primary border border-[#3A7573] rounded-xl shadow-2xl p-6 w-full max-w-md m-4 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#B0C4C3] hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                <h2 className="text-xl font-bold text-white mb-6">Create New Case</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-[#B0C4C3] font-semibold uppercase tracking-wider">Case Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., State v. Doe"
                            className="w-full bg-[#153433] border border-[#3A7573] rounded-lg px-4 py-2 text-white placeholder:text-[#B0C4C3]/50 focus:outline-none focus:ring-1 focus:ring-[#3A7573]"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-[#B0C4C3] font-semibold uppercase tracking-wider">Case Reference</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., CR-2024-001"
                            className="w-full bg-[#153433] border border-[#3A7573] rounded-lg px-4 py-2 text-white placeholder:text-[#B0C4C3]/50 focus:outline-none focus:ring-1 focus:ring-[#3A7573]"
                            value={formData.ref}
                            onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-[#B0C4C3] font-semibold uppercase tracking-wider">Case Type</label>
                        <select
                            className="w-full bg-[#153433] border border-[#3A7573] rounded-lg px-4 py-2 text-white outline-none focus:ring-1 focus:ring-[#3A7573]"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option>Criminal Defense</option>
                            <option>Family Law</option>
                            <option>Civil Litigation</option>
                            <option>Corporate</option>
                            <option>Immigration</option>
                            <option>Real Estate</option>
                        </select>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-[#B0C4C3] hover:text-white hover:bg-[#153433] rounded-lg transition-colors border border-transparent hover:border-[#3A7573]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isMutating}
                            className="px-4 py-2 text-sm bg-[#1C4645] hover:bg-[#3A7573] text-white font-bold rounded-lg transition-colors border border-[#3A7573] flex items-center gap-2"
                        >
                            {isMutating ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Create Case
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCaseModal;
