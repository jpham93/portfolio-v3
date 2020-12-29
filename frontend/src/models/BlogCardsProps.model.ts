interface BlogCardsPropsModel {
  title:            string;
  description:      string;
  blog_category: {
    text:     string;
    color:    string;
  }
  author_name:      string;
  date:             Date;
}

export default BlogCardsPropsModel
