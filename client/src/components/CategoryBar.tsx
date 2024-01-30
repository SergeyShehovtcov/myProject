import { observer } from "mobx-react-lite";
import React, { FC, ReactElement, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "src/index";
import { Category } from "src/serverTypes";

const CategoryBar: FC = observer((): ReactElement => {
  const { product } = useContext(Context);

  return (
    <ListGroup>
      {product.categories.map((category: Category) => (
        <ListGroup.Item
          key={category.id}
          style={{ cursor: "pointer" }}
          active={category.id === product.selectedCategory?.id}
          onClick={() => product.setSelectedCategory(category)}
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default CategoryBar;
