"use client";

import { motion } from "framer-motion";
import { Play, Music } from "lucide-react";

// Static tracks data for the decorative playlist display
const tracks = [
  { id: 1, name: "You'll Never Walk Alone", artist: "Gerry & The Pacemakers", duration: "2:57" },
  { id: 2, name: "Three Little Birds", artist: "Bob Marley", duration: "3:00" },
  { id: 3, name: "Freed from Desire", artist: "GALA", duration: "3:42" },
  { id: 4, name: "Seven Nation Army", artist: "The White Stripes", duration: "3:52" },
  { id: 5, name: "Hey Jude", artist: "The Beatles", duration: "4:35" },
];

export default function SpotifySection() {
  return (
    <section className="bg-mid border-y border-border px-6 md:px-20 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
      {/* Left Content */}
      <div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-[11px] font-semibold tracking-[0.14em] uppercase text-green mb-2.5"
        >
          Matchday Playlist
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-[44px] leading-none mb-5"
        >
          THE TERRACE
          <br />
          SOUNDTRACK
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray text-[15px] leading-relaxed mb-8 max-w-[420px]"
        >
          Get in the matchday mood with our curated playlist. Anthems, chants,
          and tracks that capture the spirit of the terraces.
        </motion.p>

        <motion.a
          href="https://spotify.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 bg-[#1DB954] text-white text-[13px] font-semibold tracking-[0.06em] uppercase px-7 py-3.5 rounded-full hover:opacity-85 transition-opacity"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          Listen on Spotify
        </motion.a>
      </div>

      {/* Right - Playlist */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#121212] rounded-xl p-7 border border-border"
      >
        {/* Playlist Header */}
        <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border">
          <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center">
            <Music size={20} className="text-white" />
          </div>
          <div>
            <div className="font-semibold text-[15px] mb-0.5">
              The Terrace Vibes
            </div>
            <div className="text-[12px] text-gray">
              By The Ultra&apos;s Co • {tracks.length} tracks
            </div>
          </div>
        </div>

        {/* Track List */}
        <div className="flex flex-col gap-1">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3.5 px-3 py-2.5 rounded-md cursor-pointer hover:bg-white/5 transition-colors group"
            >
              {/* Track Number / Play Button */}
              <div className="w-5 text-center">
                <span className="text-[13px] text-gray group-hover:hidden">
                  {index + 1}
                </span>
                <Play
                  size={16}
                  className="text-green hidden group-hover:block"
                  fill="currentColor"
                />
              </div>

              {/* Album Art */}
              <div className="w-10 h-10 bg-mid rounded flex-shrink-0 flex items-center justify-center text-lg">
                🎵
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate">
                  {track.name}
                </div>
                <div className="text-[12px] text-gray truncate">
                  {track.artist}
                </div>
              </div>

              {/* Duration */}
              <div className="text-[12px] text-gray">{track.duration}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
