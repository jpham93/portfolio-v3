interface BlogStateModel {
  title:            string;
  header_img:       any;
  date:             Date;
  blog_category: {
    type:   string;
    color:  string;
  };
  content:          string;
}

export default BlogStateModel
