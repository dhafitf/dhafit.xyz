import type { GetStaticProps, NextPage } from "next";
import BlogItem from "@components/Other/blog";
import More from "@components/Other/more";
import Layout from "@components/Layout/index";
import { getAllProject, getAllPosts } from "~/lib/data";
import homeStyle from "~/styles/Home.module.css";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ProjectMetaData, BlogMetaData } from "~/types/posts";

const Home: NextPage = ({ featProject, featBlog }: any) => {
  return (
    <>
      <Layout title="DhafitF" metaDesc="Dhafit Farenza blog dan portfolio">
        <div className="container">
          <div className={homeStyle.top}>
            <p className={homeStyle.p_top}>Halo, nama saya</p>
            <motion.h1
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ delay: 0.2 }}
              variants={{
                initial: { opacity: 0, x: -100 },
                enter: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 10 },
              }}
              className={homeStyle.nama}
            >
              Dhafit Farenza.
            </motion.h1>
            <motion.h2
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              dragElastic={1}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ delay: 0.2 }}
              variants={{
                initial: { opacity: 0, x: 100 },
                enter: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 10 },
              }}
              className={homeStyle.sub}
            >
              Penerjemah & Frontend web developers.
            </motion.h2>
            <p className={homeStyle.desc}>
              Saya seorang penerjemah, yang biasanya menerjemahkan bahasa Jepang dan Inggris ke bahasa Indonesia. Serta
              seorang frontend web developers.
            </p>
            <Link href="/about" passHref>
              <motion.a
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={1}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.9 }}
                className={homeStyle.btn}
              >
                Profil lengkap
              </motion.a>
            </Link>
          </div>
          <div className={homeStyle.project}>
            <h2 className={homeStyle.title}>Project unggulan</h2>
            <div className="item_container">
              {featProject.map((post: ProjectMetaData, index: React.Key) => {
                return (
                  <motion.div key={index} className="item" whileHover={{ y: -6 }} whileTap={{ scale: 0.9 }}>
                    <Link href={`/project/${post.permalink}`}>
                      <a>
                        <div className="p-top">
                          <Image src={post.thumb} width={750} height={421} layout="responsive" alt={post.title} />
                          <div className="tags">
                            <ul>
                              {post.tags.map((tag: {}, index: React.Key) => (
                                <li key={index}>{tag}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="bottom">
                          <h1 className="p-title">{post.title}</h1>
                          <p className="p-desc">{post.subtitle}</p>
                        </div>
                      </a>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <More href="/project" name="project" />
          </div>
          <div className={homeStyle.blog}>
            <h2 className={homeStyle.title}>Blog</h2>
            <div className="blog_container">
              {featBlog.map((blog: BlogMetaData, index: React.Key) => {
                return (
                  <BlogItem
                    key={index}
                    title={blog.title}
                    subtitle={blog.subtitle}
                    permalink={blog.permalink}
                    timestamp={blog.timestamp}
                  />
                );
              })}
            </div>
            <More href="/blog" name="blog" />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const allProject = getAllProject();
  const project = allProject.map(({ data, content, permalink }) => ({
    ...data,
    content,
    permalink,
  }));
  const sortProject = project.sort((a: any, b: any) => (a.order > b.order ? -1 : 1));

  const allPosts = getAllPosts();
  const blog = allPosts.map(({ data, content, permalink }) => ({
    ...data,
    content,
    permalink,
  }));

  const sortBlog = blog.sort((a: any, b: any) => (a.order > b.order ? -1 : 1));
  return {
    props: {
      featProject: sortProject.filter((post: any) => post.featured),
      featBlog: sortBlog.filter((post: any) => post.featured),
    },
  };
};
