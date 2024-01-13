import { Divider, User } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"


const Header = () => {
    return (
        <div className=" bg-slate-900 p-4 text-white">
            <div className="flex h-5 items-center justify-around space-x-4 text-small" >
                <div className=" hover:cursor-pointer" onClick={() => { window.location.assign('/dashboard') }}>Ordenes </div>
                <Divider className="bg-white" orientation="vertical" />
                <div>Docs </div>
                < Divider className="bg-white" orientation="vertical" />
                <User
                    name="Jane Doe"
                    description="Product Designer"
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                />            </div>
        </div>
    )
}

export default Header