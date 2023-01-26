import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { SwatchesPicker } from "react-color";

function Led() {
    const [ledColor, setLedColor] = useState("#000000");
    const [ledOnOff, setLedOnOff] = useState(false);
    const [ledRainbowOnOff, setLedRainbowOnOff] = useState(false);
    const [ledRainbowSpeed, setLedRainbowSpeed] = useState(0);
    const dataFetchedRef = useRef(false);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        getStatus();
    }, [])

    async function getStatus() {
        await fetch("/api/get/status")
            .then((response) => response.json())
            .then((data) => {
                if (data.success && data.status) {
                    console.log(data.status);
                    setLedColor(data.status.led.color);
                    setLedOnOff(data.status.led.on);
                    setLedRainbowOnOff(data.status.led.rainbow.on);
                    setLedRainbowSpeed(data.status.led.rainbow.speed);
                }
                console.log(data)
            })

    }

    async function sendLedColor(color) {
        let data = new FormData();
        data.append('action', 'color');
        data.append('color', color);
        await fetch("/api/set/execute/led", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => console.log(data))

    }

    async function sendLedOnOff(val) {
        let data = new FormData();
        data.append('action', (val ? "on" : "off"));
        await fetch("/api/set/execute/led", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
        setLedOnOff(val);
        console.log(ledOnOff);
    }

    async function sendLedRainbowOnOff(val) {
        let data = new FormData();
        data.append('action', "rainbow_" + (val ? "on" : "off"));
        await fetch("/api/set/execute/led", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
        setLedRainbowOnOff(val);
        console.log(ledOnOff);
    }

    async function sendLedRainbowSpeed(val) {
        let data = new FormData();
        data.append('action', "rainbow_speed");
        data.append('speed', val);
        await fetch("/api/set/execute/led", {
            method: "POST",
            body: data
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
        setLedRainbowOnOff(val);
        console.log(ledOnOff);
    }

    function handleColorChangeComplete(color) {
        sendLedColor(color.hex)
        setLedColor(color.hex);
    }

    function toggleLed(val = null) {
        if (val === null) {
            val = !ledOnOff;
        }
        sendLedOnOff(val);
    }

    function toggleRainbowLed(val = null) {
        if (val === null) {
            val = !ledRainbowOnOff;
        }
        sendLedRainbowOnOff(val);
    }

    function handleRainbowSliderChange(event) {
        setLedRainbowSpeed(event.target.value);
        sendLedRainbowSpeed(event.target.value);
    }

    let button;
    if (!ledOnOff) {
        button = <button onClick={() => toggleLed(true)}>LED einschalten</button>
    } else {
        button = <button onClick={() => toggleLed(false)}>LED ausschalten</button>
    }

    let rainbowButton;
    if (!ledRainbowOnOff) {
        rainbowButton = <button onClick={() => toggleRainbowLed(true)}>Rainbow-Modus einschalten</button>
    } else {
        rainbowButton = <button onClick={() => toggleRainbowLed(false)}>Rainbow-Modus ausschalten</button>
    }
    return (
        <div className="frontend-container">

            <div className="header">
                <Link to="/" className="settings"><FontAwesomeIcon icon={solid('x')} size="2x" /></Link>
                <h1>LEDs</h1>
                {button}
                <SwatchesPicker
                    color={ledColor}
                    onChangeComplete={handleColorChangeComplete}
                />
                {rainbowButton}
            </div>

        </div>
    )
}
export default Led;