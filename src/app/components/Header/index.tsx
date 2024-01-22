import { Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { useEffect } from "react";
import {
    closeSession,
    isActiveSession,
} from "../../../core/utils/sessionHelper";

const Header = () => {
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
        <div className=" bg-slate-900 p-4 text-white fixed top-0 w-full z-10">
            <div className="flex h-5 items-center justify-around space-x-4 text-small">
                <div
                    className=" hover:cursor-pointer"
                    onClick={() => {
                        window.location.assign("/dashboard");
                    }}
                >
                    Inicio
                </div>
                <Divider className="bg-white" orientation="vertical" />

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
                        <DropdownItem key="signOut" className="text-danger" color="danger" onPress={closeSession}>
                            Cerrar Sesión
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
