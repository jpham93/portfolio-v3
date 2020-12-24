interface HeaderPropsModel {
  title:          string;
  headerType:     'large' | 'default';
  header_img?:    any;
  header_color?:  string;
  subtitle?: {
    text:             string;
    backgroundColor?: string;
  }
}

export default HeaderPropsModel;
