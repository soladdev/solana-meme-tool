import Layout from "@/components/Layout/layout";
import { volumeBoostMode } from "@/lib/constant";
import { toastError, toastSuccess } from "@/lib/utils";
import { useVolumeContext } from "@/providers/volume";
import { Button, Card, CardBody, Input } from "@heroui/react";
import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Home() {
    // Private code
}