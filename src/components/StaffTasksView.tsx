import React, { useState } from 'react';
import { CheckSquare, Clock, AlertTriangle, Plus, CheckCircle2, User, MapPin, X } from 'lucide-react';
import { StaffTask } from '../types';

interface StaffTasksViewProps {
  tasks: StaffTask[];
  onAddTask: (newTask: StaffTask) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: StaffTask['status']) => void;
}

export const StaffTasksView: React.FC<StaffTasksViewProps> = ({
  tasks,
  onAddTask,
  onUpdateTaskStatus,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState<StaffTask['department']>('Housekeeping');
  const [roomOrLocation, setRoomOrLocation] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState<StaffTask['priority']>('High');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTask: StaffTask = {
      id: `TSK-${Date.now().toString().slice(-4)}`,
      title,
      department,
      roomOrLocation,
      assignee,
      priority,
      status: 'Pending',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    onAddTask(newTask);
    setShowAddModal(false);
    setTitle('');
    setRoomOrLocation('');
  };

  const getPriorityBadge = (p: StaffTask['priority']) => {
    switch (p) {
      case 'High':
        return <span className="px-2 py-0.5 bg-rose-950 text-rose-400 border border-rose-800 rounded text-[10px] font-bold">High Priority</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 rounded text-[10px] font-bold">Medium</span>;
      case 'Low':
        return <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 rounded text-[10px] font-bold">Low</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl font-extrabold text-white">Staff Operations Task Dispatch</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dispatch and track real-time resolution for Housekeeping, Maintenance, F&B, and Concierge.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Dispatch Staff Task</span>
        </button>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="px-2.5 py-1 bg-slate-950 text-cyan-300 border border-slate-800 rounded-lg text-xs font-bold">
                  {task.department}
                </span>
                {getPriorityBadge(task.priority)}
              </div>

              <div>
                <h3 className="font-extrabold text-white text-base leading-snug">{task.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-orange-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{task.roomOrLocation}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Assigned To:</span>
                  <span className="font-bold text-white">{task.assignee}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Dispatched At:</span>
                  <span className="font-mono text-slate-400">{task.createdAt}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2 mt-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  task.status === 'Completed'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : task.status === 'In Progress'
                    ? 'bg-sky-950 text-sky-300 border border-sky-800'
                    : 'bg-orange-950 text-orange-300 border border-orange-800'
                }`}
              >
                {task.status}
              </span>

              <div className="flex items-center gap-1">
                {task.status === 'Pending' && (
                  <button
                    onClick={() => onUpdateTaskStatus(task.id, 'In Progress')}
                    className="px-3 py-1.5 bg-sky-900 hover:bg-sky-800 text-sky-200 text-xs font-semibold rounded-xl"
                  >
                    Start
                  </button>
                )}
                {task.status !== 'Completed' && (
                  <button
                    onClick={() => onUpdateTaskStatus(task.id, 'Completed')}
                    className="px-3 py-1.5 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Resolve
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreate} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">Dispatch New Staff Task</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Task Description</label>
                <input
                  type="text"
                  placeholder="e.g. Deliver extra champagne glasses to Villa 01"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Front Desk">Front Desk</option>
                    <option value="F&B Services">F&B Services</option>
                    <option value="Water Sports">Water Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Location / Unit</label>
                  <input
                    type="text"
                    placeholder="e.g. Presidential Villa 01"
                    value={roomOrLocation}
                    onChange={(e) => setRoomOrLocation(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Assignee Staff Member</label>
                  <input
                    type="text"
                    placeholder="e.g. Mariama Sesay"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Dispatch Task
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
