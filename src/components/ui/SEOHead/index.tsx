import React, { FC } from 'react';
import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: { pathname: string; query?: any };
  keyword?: string;
  isMobileUrl?: boolean;
  jsonLd?: any;
}

const SEOHead: FC<SEOHeadProps> = (props) => {
  const { title, description, image, url, keyword, isMobileUrl = true, jsonLd } = props;
  const OgImage = `${process.env.NEXT_PUBLIC_S3_URL}/public/images/logo/roomlet_og_image.png`;
  const commonMetaData = {
    title: '룸렛',
    description: '룸렛에서 간편하게 회의를 관리해보세요!',
    keyword: '회의, 회의예약',
  };

  return (
    <Head>
      <title>{title || commonMetaData.title}</title>
      <meta name="description" content={description || commonMetaData.description} />
      <meta property="og:title" content={title || commonMetaData.title} />
      <meta property="og:description" content={description || commonMetaData.description} />
      <meta property="og:image" content={image || OgImage} />
      <meta property="og:site_name" content="룸렛" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${url.pathname}${url.query ? `?${url.query}` : ''}`}
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:keyword" content={keyword || commonMetaData.keyword} />

      <meta name="twitter:title" content={title || commonMetaData.title} />
      <meta name="twitter:description" content={description || commonMetaData.description} />
      <meta name="twitter:card" content="summary" />

      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </Head>
  );
};

export default SEOHead;
