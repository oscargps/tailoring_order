import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { useEffect } from "react";
import {
    closeSession,
    isActiveSession,
} from "../../../core/utils/sessionHelper";
import { useNavigate } from "react-router-dom";
import BackIcon from "../Icons/BackIcon";

const MenuItems = [
    {
        label: "Inicio",
        path: "/dashboard"
    },
    {
        label: "Facturas",
        path: "/invoices"
    },
]

const Header = () => {
    const navigate = useNavigate();
    const getSession = async () => {
        const isSession = await isActiveSession();
        if (!isSession) {
            closeSession();
        }
    };

    useEffect(() => {
        getSession();
    }, []);

    return (
        <div className=" bg-slate-900 p-4 text-white h-full min-h-screen relative">
            <Button className="w-5 h-5 rounded-full bg-slate-900 absolute -right-5 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center" isIconOnly>
                <BackIcon color="white" />
            </Button>
            <div className="flex flex-col min-h-full h-max space-y-4 text-small flex-grow">
                <Dropdown>
                    <DropdownTrigger>
                        <User
                            name="Jane Doe"
                            description="Product Designer"
                            avatarProps={{
                                src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
                            }}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                            key="signOut"
                            className="text-danger"
                            color="danger"
                            onPress={closeSession}
                        >
                            Cerrar Sesión
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Divider className="bg-white" orientation="horizontal" />
                <div className="flex flex-col h-full flex-grow justify-between">
                    <div className="space-y-4">
                        {MenuItems.map((menuItem) => (
                            <div
                                className=" hover:cursor-pointer"
                                onClick={() => {
                                    navigate(menuItem.path);
                                }}
                            >
                                {menuItem.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
