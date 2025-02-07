import Link from "next/link";
import { usePathname } from "next/navigation";

import Button from "@/lib/components/ui/Button";

export const AuthButtons = (): JSX.Element => {
  const pathname = usePathname();

  if (pathname === "/signup") {
    return (
      <Link href={"/login"}>
        <Button variant={"secondary"}>Đăng nhập</Button>
      </Link>
    );
  }
  else if (pathname === "/login") {
    return (
      <Link href={"/signup"}>
        <Button variant={"secondary"}>Tạo tài khoản</Button>
      </Link>
    )
  } else {
    return (
      <Link href={"/login"}>
        <Button variant={"secondary"}>Đăng nhập</Button>
      </Link>
    );
  }

  
};
