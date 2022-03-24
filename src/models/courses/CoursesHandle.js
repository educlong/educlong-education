import React from "react";
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';

//Handle for a course
function Label(label) {
    return (
        <Link className="badge bg-secondary text-decoration-none link-light my-3" to={"/"+label.labelArticle.key}>{label.labelArticle.type}</Link>
    );
}

const opts = {
    height: '500',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
};
function Article(article) {
    return (/* Post content*/
        <article>
            {/* Post header*/}
            <header className="mb-4">
                <h1 className="fw-bolder mb-1">{article.video.videoTitle}</h1>              {/* Post title*/}
                <div className="text-muted fst-italic mb-2">{article.dataContent.date}</div> {/* Post meta content*/}
                <Label labelArticle={article.dataContent} className="my-3"/>
                <YouTube  videoId={article.video.videoId} opts={opts} />
            </header>
            {/* Preview image figure*/}
            {/* <figure className="mb-4"><img className="img-fluid rounded" src={`${linkApiThumbnail}${article.dataChildrent.videoId}${sizeApiThumbnail}`} alt="..." /></figure> */}
        </article>
    );
}
export function Content(content) {
    return (
        <div className="col-lg-12">
            <Article video={content.video}
                    dataContent={content.dataContent}
                    // date={content.dataContent.date}
                    // imgBackground={content.dataContent.imgBackground}
                    // typeOfNews = {content.dataContent.type}
                    // summary = {content.dataContent.summary}
                    />
        </div>
    );
}
export function Author(author) {
    return (
        <div className="col-lg-12">
            <div className="d-flex align-items-center mb-4 px-sm-5">
            <img className="img-fluid rounded-circle" src={author.avatarAuthor} alt="..." />
            <div className="ms-3">
                <div className="fw-bold">{author.nameAuthor}</div>
                <div className="text-muted">{author.positionAuthor}</div>
            </div>
            </div>
        </div>
    );
}