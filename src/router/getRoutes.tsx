import React from "react";
import {useRoutes} from 'react-router-dom'
import type { ReactNode } from "react"
import routes from "router/index"

interface GetRoutesType {
  children?: ReactNode;
}

const GetRoutes: React.FC<GetRoutesType> = () => {
  return <>{useRoutes(routes)}</>;
}

GetRoutes.displayName = "GetRoutes";

export default GetRoutes;