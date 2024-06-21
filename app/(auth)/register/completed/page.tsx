import React from "react";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-center text-2xl font-bold">
        サンプルアカウント登録完了
      </h1>
      <p className="text-center text-sm">
        サンプルの登録が完了しました。
        <br />
        続けてサンプルの登録に進んでください。
      </p>
      <div className="bg-gray-100 py-4 px-6">
        <h2 className="text-center font-bold">サンプル情報</h2>
        <ul className="text-xs mt-4 leading-normal">
          <li>
            <span>サン：{"サンプル"}</span>
          </li>
          <li>
            <span>サン：{"サンプル"}</span>
          </li>
          <li>
            <span>サン：{"サンプル"}</span>
          </li>
          <li>
            <span>サンプル：{"000-000-000"}</span>
          </li>
          <li>
            <span>サン：{"サンプル"}</span>
          </li>
        </ul>
        <p className="text-xs">サンプル情報はいつでも変更できます。</p>
      </div>
      <Button>サン/サンプル登録へ</Button>
      <Button variant={"link"} className="underline font-bold text-base">
        マイページへ
      </Button>
    </div>
  );
};

export default page;
