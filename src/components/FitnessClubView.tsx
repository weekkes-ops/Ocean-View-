import React, { useState } from 'react';
import { Dumbbell, Users, Clock, CheckCircle2, MapPin, Plus } from 'lucide-react';
import { FitnessSession } from '../types';

interface FitnessClubViewProps {
  sessions: FitnessSession[];
  onAddSession: (newSession: FitnessSession) => void;
  onRegisterMember: (sessionId: string) => void;
}

export const FitnessClubView: React.FC<FitnessClubViewProps> = ({
  sessions,
  onAddSession,
  onRegisterMember,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-extrabold text-white">Fitness Club & Wellness</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Personal trainers, sunrise beach yoga decks, high-intensity challenge classes, and tennis coaching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded-xl text-xs font-semibold">
            Gym Gym Pass Scanner Active
          </span>
        </div>
      </div>

      {/* Fitness Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-emerald-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 rounded-lg text-xs font-bold">
                  {sess.type}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" /> {sess.location}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base leading-snug">{sess.title}</h3>
                <span className="text-xs text-emerald-400 font-medium">Trainer: {sess.instructor}</span>
              </div>

              <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> Time Slot:
                  </span>
                  <span className="font-bold text-white">{sess.timeSlot}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-400" /> Registration:
                  </span>
                  <span className="font-bold text-emerald-400">
                    {sess.registeredCount} / {sess.capacity} Enrolled
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2 mt-4">
              <button
                onClick={() => onRegisterMember(sess.id)}
                disabled={sess.registeredCount >= sess.capacity}
                className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                {sess.registeredCount >= sess.capacity ? 'Class Full' : 'Register Guest'}
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
