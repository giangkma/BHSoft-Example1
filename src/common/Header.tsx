import {
    HomeOutlined,
    LogoutOutlined,
    PlusOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Layout, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { appActions } from "../redux/actions";
import "./style.css";

interface checkListProduct {
    id: string;
    numberOfReviews: number;
    rate: number;
    qty: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    image: string;
    quantity: number;
}
interface IProps {
    match: {
        url: string;
    };
}
const { Header } = Layout;

const HeaderPage = (props: IProps) => {
    const dispatch = useDispatch();
    const { url } = props.match;
    const dataCart = useSelector(
        (state: { dataCart: checkListProduct[] }) => state.dataCart
    );
    const dataProduct = useSelector(
        (state: { dataProduct: checkListProduct[] }) => state.dataProduct
    );

    const onLogoutAccount = () => {
        dispatch(appActions.logout.request());
    };
    const onShowModalAddProduct = () => {
        dispatch(appActions.showModal());
    }
    return (
        <div>
            <Header>
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item
                        className={url === '/' ? 'ant-menu-item-selected' : ''}
                    >
                        <span className="menu-item">
                            <span>
                                <HomeOutlined />
                            </span>
                            <span>
                                <Link to="/">Trang chủ</Link>
                            </span>
                        </span>
                    </Menu.Item>
                    <Menu.Item>
                        <Badge count={dataProduct.length}>
                            <span className="menu-item">
                                <span>
                                    <PlusOutlined />
                                </span>
                                <span>
                                    <Link
                                        to="#"
                                        onClick={onShowModalAddProduct}
                                    >
                                        Thêm sản phẩm
                                    </Link>
                                </span>
                            </span>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item
                        className={
                            url === '/cart' ? 'ant-menu-item-selected' : ''
                        }
                    >
                        <Badge count={dataCart.length}>
                            <span className="menu-item">
                                <span>
                                    <ShoppingCartOutlined />
                                </span>
                                <span>
                                    <Link to="/cart">Giỏ Hàng</Link>
                                </span>
                            </span>
                        </Badge>
                    </Menu.Item>
                    <Menu.Item>
                        <span className="menu-item" onClick={onLogoutAccount}>
                            <span>
                                <LogoutOutlined />
                            </span>
                            <span>
                                <Link to="/login">Đăng xuất</Link>
                            </span>
                        </span>
                    </Menu.Item>
                </Menu>
            </Header>
        </div>
    );
};

export default React.memo(withRouter(HeaderPage));
