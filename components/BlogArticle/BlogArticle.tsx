import React from 'react'
import { Article } from '../../types/Article'
import BlogArticleHeader from './BlogArticleHeader/BlogArticleHeader';
import BlogArticleBody from './BlogArticleBody/BlogArticleBody';
import ProseContainer from '../containers/ProseContainer/ProseContainer';
import ContentWithSideBarWrapper from '../containers/ContentWithSideBarWrapper/ContentWithSideBarWrapper';

interface Props  {
  article: Article
}

const BlogArticle: React.FC<Props> = ({ article }) => {
  const { body } = article;

  return (
    <ContentWithSideBarWrapper content={(
      <ProseContainer className="col-start-1 col-end-5">
        <BlogArticleHeader article={article} />
        
        <BlogArticleBody markdownContent={body} />
      </ProseContainer>
    )} />
  )
}

export default BlogArticle
