import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import Routers from "../../../../routing/routers";
const Navbar = () => {
    return (
        <ul className="navbar-list">
            <li className="">
                <Link to="/" title="Tổng quan">
                    <img src="/assets/icon/icon_goods.svg" alt="Tổng quan" />
                    <span>Tổng quan</span>
                </Link>
            </li>
            <li className="navbar-list-item">
                <Link to="/hang-hoa/san-pham" title="Hàng hóa">
                    <img src="/assets/icon/icon_goods.svg" alt="Tổng quan" />
                    <span>Hàng hóa</span>
                </Link>
                <ul className="dropdown-list">
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/san-pham" title="Sản phẩm">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Tổng quan"
                            />
                            <span>Sản phẩm</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/ton-kho" title="Sản phẩm">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Tổng quan"
                            />
                            <span>Tồn kho</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link
                            to="/hang-hoa/nhom-san-pham"
                            title="Nhóm sản phẩm"
                        >
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Nhóm sản phẩm"
                            />
                            <span>Nhóm sản phẩm</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/danh-muc" title="Danh mục">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Danh mục"
                            />
                            <span>Danh mục</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/thuong-hieu" title="Thương hiệu">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Tổng quan"
                            />
                            <span>Thương hiệu</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/thuoc-tinh" title="Thuộc tính">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="thuoc-tinh"
                            />
                            <span>Thuộc tính</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/ma-giam-gia" title="Danh mục">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Danh mục"
                            />
                            <span>Mã giảm giá</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/the-san-pham" title="Thẻ sản phẩm">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Tổng quan"
                            />
                            <span>Thẻ sản phẩm</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/hang-hoa/nhan" title="Nhãn">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Tổng quan"
                            />
                            <span>Nhãn</span>
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="navbar-list-item">
                <Link to="/don-hang" title="Đơn hàng">
                    <img src="/assets/icon/icon_partner.svg" alt="Đơn hàng" />
                    <span>Đơn hàng</span>
                </Link>
            </li>
            {/* <li className="navbar-list-item">
                <Link to="/pos/may-pos" title="POS">
                    <img src="/assets/icon/icon_laptop.svg" alt="POS" />
                    <span>POS</span>
                </Link>
                <ul className="dropdown-list">
                    <li className="dropdown-list-item">
                        <Link to="/pos/may-pos" title="Máy Pos">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Máy Pos"
                            />
                            <span>Máy Pos</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/pos/tang-phong" title="Tầng phòng">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Tầng phòng"
                            />
                            <span>Tầng phòng</span>
                        </Link>
                    </li>
                    <li className="dropdown-list-item">
                        <Link to="/pos/ban-an" title="Bàn ăn">
                            <img
                                src="/assets/icon/icon_goods.svg"
                                alt="Bàn ăn"
                            />
                            <span>Bàn ăn</span>
                        </Link>
                    </li>
                </ul>
            </li>
            <li className="navbar-list-item">
                <Link to="chi-nhanh-cua-hang">
                    <img src="/assets/icon/icon_laptop.svg" alt="Máy POS" />
                    <span>Chi nhánh cửa hàng</span>
                </Link>
            </li> */}
        </ul>
    );
};
export default observer(Navbar);
