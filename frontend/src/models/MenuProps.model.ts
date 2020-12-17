interface MenuPropsModel {
  Brand: {
    firstname:  string;
    lastname:   string;
  };
  Links: {
    name:   string;
    path?:  string;
  }[];
  inFooter:   boolean;
  color?:     string;
  alt_color?: string;
}

export default MenuPropsModel;
