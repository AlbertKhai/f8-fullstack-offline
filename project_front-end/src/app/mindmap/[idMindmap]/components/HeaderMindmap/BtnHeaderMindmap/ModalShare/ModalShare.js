import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BtnSwitch from "./BtnSwitch";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { mindmapShare } from "@/redux/services/mindmapShare";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function ModalShare({ isOpen, onOpen }) {
    const dispatch = useDispatch();
    const { idMindmap } = useParams();
    const mindmap = useSelector(({ mindmap }) =>
        mindmap.listMindmap.find(({ id }) => id === idMindmap)
    );
    const { data, isLoading, error } =
        mindmapShare.useGetMindmapShareQuery(idMindmap);
    const [postMindmapShare, resultPost] =
        mindmapShare.usePostMindmapShareMutation();
    const [updateMindmapShare, resultUp] =
        mindmapShare.useUpdateMindmapShareMutation();
    const [deleteMindmapShare, resultDel] =
        mindmapShare.useDeleteMindmapShareMutation();

    const [dataMindmap, setDataMindmap] = useState({
        title: mindmap?.title,
        desc: mindmap?.desc,
        image: `${process.env.AUTH0_BASE_URL}/mindmap.jpg`,
    });
    const [isShare, setIsShare] = useState(false);
    const [loading, setLoading] = useState(false);

    const cancelButtonRef = useRef(null);
    const formRef = useRef();

    const handleCopyLinkShare = (mess) => {
        navigator.clipboard.writeText(
            `${process.env.AUTH0_BASE_URL}/mindmap/share/${idMindmap}`
        );
        toast.success(mess || "Copy link share thành công");
    };

    const handleShare = async (e) => {
        e.preventDefault();

        if (!isShare && !data) {
            onOpen(false);
            return toast.success("Lưu lại thành công");
        }

        const formData = new FormData(formRef.current);

        const dataShare = {
            ...mindmap,
            title: formData.get("title"),
            desc: formData.get("desc"),
            image: formData.get("image"),
        };

        try {
            let res;
            setLoading(true);
            if (isShare && !data) {
                res = await postMindmapShare(dataShare);
            }

            if (isShare && data) {
                res = await updateMindmapShare({ idMindmap, body: dataShare });
            }

            if (!isShare && data) {
                res = await deleteMindmapShare(idMindmap);
            }

            if (res.error)
                throw new Error(
                    "Lưu không thành công, bạn vui lòng thử lại nhé"
                );
            onOpen(false);
            toast.success("Lưu lại thành công");
            if (isShare) {
                handleCopyLinkShare("Đã copy link share mindmap");
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!isLoading && data !== undefined) {
            setDataMindmap(data);
            setIsShare(true);
        }
    }, [isLoading, data]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                data === undefined && setIsShare(false);
            }, 300);
        }
    }, [isOpen]);

    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={onOpen}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:items-start">
                                    {/* Modal header */}
                                    <div className="flex items-center justify-center gap-3 p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-xl font-semibold leading-6 text-gray-900"
                                        >
                                            Chia sẻ với mọi người
                                        </Dialog.Title>
                                        <BtnSwitch
                                            isShare={isShare}
                                            onShare={setIsShare}
                                        />
                                    </div>
                                    {/* Modal body */}
                                    <form
                                        ref={formRef}
                                        id="formShareMindmap"
                                        onSubmit={handleShare}
                                        className="p-4 md:p-5 relative"
                                    >
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2">
                                                <label
                                                    htmlFor="titleShareMindmap"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Tiêu đề
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="titleShareMindmap"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Tiêu đề mindmap"
                                                    defaultValue={
                                                        dataMindmap.title
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label
                                                    htmlFor="descShareMindmap"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    id="descShareMindmap"
                                                    name="desc"
                                                    rows={4}
                                                    className="resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Mô tả mindmap"
                                                    defaultValue={
                                                        dataMindmap.desc
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <label
                                                    htmlFor="imageShareMindmap"
                                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Ảnh chia sẻ
                                                </label>
                                                <input
                                                    type="text"
                                                    name="image"
                                                    id="imageShareMindmap"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Ảnh chia sẻ mindmap"
                                                    defaultValue={
                                                        dataMindmap.image
                                                    }
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCopyLinkShare()
                                                    }
                                                    className="bg-gray-300 hover:bg-gray-400 text-base text-gray-800 font-bold py-2 px-4 mx-auto gap-2 rounded flex items-center"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCopy}
                                                    />
                                                    <span>Copy Link Share</span>
                                                </button>
                                            </div>
                                        </div>
                                        {!isShare && (
                                            <div className="absolute top-0 start-0 w-full h-full bg-white/[.7] rounded-lg dark:bg-gray-800/[.4]"></div>
                                        )}
                                    </form>

                                    <div className="py-3 px-4 md:p-5 sm:flex sm:flex-row-reverse border-t">
                                        <button
                                            type="submit"
                                            form="formShareMindmap"
                                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 sm:ml-3 sm:w-auto"
                                        >
                                            Lưu lại
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => onOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Đóng
                                        </button>
                                    </div>

                                    {loading && (
                                        <>
                                            <div className="absolute top-0 start-0 w-full h-full bg-white/[.5] rounded-lg dark:bg-gray-800/[.4]"></div>
                                            <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <div
                                                    className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                                                    role="status"
                                                    aria-label="loading"
                                                >
                                                    <span className="sr-only">
                                                        Loading...
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
