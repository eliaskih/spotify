import React from "react";
import { ChevronDown } from "react-feather";
import PlayerControls from "./PlayerControls";

export default function PlayerOverlay({
    setPlayerOverlayIsOpen,
    playerOverlayIsOpen,
    track,
    localPlayer,
    isPaused,
    position,
}) {
    return (
        <div
            className="transition-tranfsorm  fixed top-0 h-screen w-screen    bg-bg-dimmed duration-500 md:hidden"
            style={{
                transform: `translateY(${playerOverlayIsOpen ? "0%" : "100%"})`,
            }}
        >
            <div
                className="fixed top-4 left-3 flex h-8 w-8 items-center justify-center rounded-full hover:bg-text-dimmed/20"
                onClick={() => setPlayerOverlayIsOpen(false)}
            >
                <ChevronDown />
            </div>
            <div className="absolute  top-6 left-1/2 max-w-[30ch] -translate-x-1/2 truncate text-lg font-bold text-text-dimmed">
                {track.album.name}
            </div>
            <div className="flex h-full flex-col gap-20 px-5 pt-36 pb-10">
                <div className="mx-auto aspect-square max-w-[450px] bg-red-500">
                    <img
                        src={track.album.images[0]?.url}
                        alt=""
                        className="h-full w-full"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-bold">{track.name}</h2>
                    <p className="text-text-dimmed">{track.artists[0].name}</p>
                </div>
                <div className="mt-auto">
                    <PlayerControls
                        player={localPlayer}
                        isPaused={isPaused}
                        position={position}
                        track={track}
                    />
                </div>
            </div>
        </div>
    );
}
