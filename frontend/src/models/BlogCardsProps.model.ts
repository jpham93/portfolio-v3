interface BlogCardsPropsModel {
  title:            string;
  description:      string;
  blog_category: {
    type:     string;
    color:    string;
  }
  author_name:      string;
  date:             Date;
}

export default BlogCardsPropsModel
