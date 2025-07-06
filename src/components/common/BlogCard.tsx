import { Link } from "react-router-dom"
import type { BlogCardType } from "../../assets/types"
import { BlogTitleBar } from "./BlogTitleBar"
import DOMPurify from 'dompurify';

export function BlogCard({id, authorId, authorName, date, title, content} : BlogCardType){
    return (
        <div className="">
            <div className="flex w-full rounded-lg">
                <div className="w-full pr-4">
                    <BlogTitleBar authorId ={authorId} authorName={authorName} date={date}></BlogTitleBar>
                    <div className="flex flex-col mt-5 w-full group hover:bg-gray-50 active:bg-gray-200 transition-colors duration-200 ">
                        <Link to={`/blog/${id}`}>
                            <div className="">
                                <p className="font-bold text-xl group-hover:text-blue-600 transition-colors duration-200">{title}</p>
                            </div>
                            <div className="mt-2 group-hover:text-gray-700 transition-colors duration-200">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
                            </div>
                        </Link>
                    </div>
                    <div className="mt-5">
                        <div className="h-1 bg-gray-100 border-0 rounded-sm"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}