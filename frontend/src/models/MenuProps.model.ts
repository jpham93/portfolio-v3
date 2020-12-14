interface MenuPropsModel {
  Brand: {
    firstname: string;
    lastname: string;
  };
  Links: {
    name: string;
    path?: string;
  }[];
}

export default MenuPropsModel;
