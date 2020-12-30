interface BlogStateModel {
  date:             Date;
  blog_category: {
    type:   string;
    color:  string;
  };
  content:          string;
  author?:          string;
}

export default BlogStateModel
