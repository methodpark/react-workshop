import React from "react";

interface HeaderProps {
    text: string;
}

export default function Header({ text }: HeaderProps) {
    return (
        <h1>{text}</h1>
    );
}
