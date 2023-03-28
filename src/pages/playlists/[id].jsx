import Layout from "@/components/Layout";
import React from "react";
import { spotifyApi } from "../_app";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { formatTime } from "@/utils/formatTime";
import { Clock } from "react-feather";
import { Play } from "react-feather";

export default function Playlist() {
    const router = useRouter();

    const {
        data: playlist,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["playlists", router.query.id],
        queryFn: async () =>
            (await spotifyApi.getPlaylist(router.query.id)).body,
    });

    console.log(playlist);

    if (isLoading) return <Layout>loading...</Layout>;

    if (isError) return <Layout>error...</Layout>;

    return (
        <Layout>
            <div className="flex items-end gap-3 bg-gradient-to-b from-primary/60 to-bg-dimmed p-10">
                <img
                    src={playlist.images[0]?.url}
                    alt="playlist image"
                    className="h-60 w-60 flex-shrink-0"
                />
                <div>
                    <p className="font-semibold text-text-dimmed">Playlist</p>
                    <h2 className="text-6xl font-black">{playlist.name}</h2>
                </div>
            </div>
            <div className="p-10">
                <div className="w-full text-text-dimmed">
                    <div className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-4 px-6">
                        <div className="w-8">#</div>
                        <div>Name</div>
                        <div>Album</div>
                        <div>
                            <Clock className="h-5 w-5" />
                        </div>
                    </div>

                    <hr className="my-3 border-text-dimmed/30"></hr>
                    {playlist.tracks.items.map((item, index) => (
                        <div
                            key={item.id}
                            className="group grid grid-cols-[auto_1fr_1fr_auto] items-center gap-4 rounded-md py-1.5 px-3 text-sm  hover:bg-text-dimmed/10"
                        >
                            <div className=" w-8 text-base">
                                <p className="truncate group-hover:hidden">
                                    {index + 1}
                                </p>
                                <Play className="hidden h-5 w-5 fill-text-dimmed group-hover:block" />
                            </div>
                            <div className="flex items-center  gap-4 overflow-hidden">
                                <img
                                    src={item.track.album.images[0].url}
                                    alt=""
                                    className="h-12 w-12"
                                />
                                <div className="overflow-hidden">
                                    <h4 className="truncate text-text">
                                        {item.track.name}
                                    </h4>
                                    <p className="">
                                        {item.track.artists[0].name}
                                    </p>
                                </div>
                            </div>

                            <div className="truncate">
                                {item.track.album.name}
                            </div>
                            <div>{formatTime(item.track.duration_ms)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}