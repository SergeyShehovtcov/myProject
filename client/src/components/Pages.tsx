import React, { FC, ReactElement, useContext } from 'react';
import { observer } from "mobx-react-lite";
import { Pagination } from "react-bootstrap";

import { Context } from "src/index";


const Pages: FC = observer((): ReactElement => {
    const { product } = useContext(Context);
    const pageCount: number = Math.ceil(product.totalCount / product.limit);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className="mt-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={product.page === page}
                    onClick={() => product.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;