"use client";

import { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import {
  mockMembers, roleBadge, rolePermissions,
  type Member, type Role, type Permission,
} from "@/data/team";
import {
  Plus, MessageCircle, Star, Pencil, MoreHorizontal,
  X, Check, Info, ShieldCheck,
} from "lucide-react";

const EMPLOYEE_ROLES: Role[] = ["Kasir", "Logistik", "Pramuniaga"];
const ALL_PERMISSIONS: Permission[] = [
  "Dashboard", "POS / Kasir", "Produk & Inventori", "Transaksi",
  "Pelanggan", "Supplier", "Team & Roles", "Laporan & Analisis", "Pengaturan",
];

type InviteForm = { name: string; email: string; role: Role };
const emptyInvite: InviteForm = { name: "", email: "", role: "Kasir" };

// deep-clone the default permissions into editable state
function initPerms() {
  const result = {} as Record<Role, Set<Permission>>;
  for (const [role, perms] of Object.entries(rolePermissions)) {
    result[role as Role] = new Set(perms as Permission[]);
  }
  return result;
}

export default function TeamPage() {
  const [members, setMembers]   = useState<Member[]>(mockMembers);
  const [hoveredId, setHovered] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const [showPerms, setShowPerms]   = useState(false);
  const [inviteForm, setInvite]     = useState<InviteForm>(emptyInvite);
  const [editMember, setEdit]       = useState<Member | null>(null);
  const [perms, setPerms]           = useState<Record<Role, Set<Permission>>>(initPerms);

  function togglePerm(role: Role, perm: Permission) {
    // Owner & Super Admin permissions are locked
    if (role === "Owner" || role === "Super Admin") return;
    setPerms(prev => {
      const next = { ...prev, [role]: new Set(prev[role]) };
      if (next[role].has(perm)) next[role].delete(perm);
      else next[role].add(perm);
      return next;
    });
  }

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;
    const badge = roleBadge[inviteForm.role];
    const initials = inviteForm.name
      .split(" ").slice(0, 2).map(w => w[0]?.toUpperCase() ?? "").join("");
    const colors: [string, string][] = [
      ["#DC2626","#FFFFFF"],["#D97706","#FFFFFF"],["#059669","#FFFFFF"],
      ["#7C3AED","#FFFFFF"],["#2563EB","#FFFFFF"],
    ];
    const avatarColor = colors[members.length % colors.length];
    const newMember: Member = {
      id: `M-${String(members.length + 1).padStart(3, "0")}`,
      name: inviteForm.name, email: inviteForm.email,
      role: inviteForm.role, joinDate: "14 Jun 2026",
      avatarColor, initials,
    };
    setMembers(prev => [...prev, newMember]);
    setShowInvite(false);
    setInvite(emptyInvite);
    void badge;
  }

  function handleRemove(id: string) {
    setMembers(prev => prev.filter(m => m.id !== id));
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Team &amp; Roles</h1>
          <p className="mt-0.5 text-sm text-gray-500">Atur tim anda</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowPerms(p => !p)}
            className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">
            <Info size={14} />
            Hak Akses
          </button>
          <button onClick={() => setShowInvite(true)}
            className="flex items-center gap-2 rounded-xl bg-[#FF6B00] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#E05E00]">
            <Plus size={15} strokeWidth={2.5} />
            Invite Member
          </button>
        </div>
      </div>

      {/* Role permissions table */}
      {showPerms && (
        <div className="mb-5 overflow-hidden rounded-[20px] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50">
                <ShieldCheck size={15} className="text-[#FF6B00]" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Hak Akses per Role</p>
                <p className="mt-0.5 text-xs text-gray-400">Klik centang untuk mengubah akses Kasir, Logistik, atau Pramuniaga</p>
              </div>
            </div>
            <button onClick={() => setShowPerms(false)} className="text-gray-300 hover:text-gray-500">
              <X size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-400">Fitur</th>
                  {(["Owner", "Kasir", "Logistik", "Pramuniaga"] as Role[]).map(r => (
                    <th key={r} className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-lg px-2.5 py-0.5 text-[11px] font-bold ${roleBadge[r].bg} ${roleBadge[r].text}`}>
                        {r}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_PERMISSIONS.map((perm, i) => (
                  <tr key={perm} className={i < ALL_PERMISSIONS.length - 1 ? "border-b border-gray-50" : ""}>
                    <td className="px-6 py-3 text-xs font-semibold text-gray-600">{perm}</td>
                    {(["Owner", "Kasir", "Logistik", "Pramuniaga"] as Role[]).map(r => {
                      const hasAccess = perms[r].has(perm);
                      const isLocked  = r === "Owner";
                      return (
                        <td key={r} className="px-4 py-3 text-center">
                          <button
                            onClick={() => togglePerm(r, perm)}
                            title={isLocked ? "Owner selalu punya akses penuh" : hasAccess ? "Cabut akses" : "Beri akses"}
                            className={`mx-auto flex h-6 w-6 items-center justify-center rounded-md transition-all ${
                              hasAccess
                                ? isLocked
                                  ? "bg-green-100 text-green-500 cursor-not-allowed"
                                  : "bg-green-100 text-green-600 hover:bg-green-200 cursor-pointer"
                                : isLocked
                                  ? "cursor-not-allowed"
                                  : "hover:bg-gray-100 cursor-pointer"
                            }`}
                          >
                            {hasAccess
                              ? <Check size={12} strokeWidth={3} />
                              : <span className="block h-0.5 w-3 rounded-full bg-gray-200" />
                            }
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-50 px-6 py-3">
            <p className="text-[11px] text-gray-400">
              <span className="font-semibold text-orange-500">Owner</span> selalu memiliki akses penuh dan tidak dapat diubah.
            </p>
          </div>
        </div>
      )}

      {/* Karyawan section */}
      <div className="rounded-[20px] bg-[#F5F6FA] p-4">
        <p className="mb-3 px-2 text-sm font-bold text-gray-700">Karyawan</p>
        <div className="space-y-1">
          {members.map(member => {
            const badge = roleBadge[member.role];
            const isHovered = hoveredId === member.id;
            return (
              <div
                key={member.id}
                onMouseEnter={() => setHovered(member.id)}
                onMouseLeave={() => setHovered(null)}
                className={`flex cursor-default items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                  isHovered ? "bg-orange-50" : "bg-transparent"
                }`}
              >
                {/* Avatar */}
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ background: member.avatarColor[0], color: member.avatarColor[1] }}
                >
                  {member.initials}
                </div>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>

                {/* Role badge (always shown) */}
                <span className={`hidden rounded-lg px-2 py-0.5 text-[10px] font-bold sm:inline-block ${badge.bg} ${badge.text}`}>
                  {member.role}
                </span>

                {/* Action icons (hover only) */}
                {isHovered && (
                  <div className="flex items-center gap-1 ml-2">
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-600">
                      <MessageCircle size={14} />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-600">
                      <Star size={14} />
                    </button>
                    <button onClick={() => setEdit(member)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-orange-100 hover:text-orange-600">
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleRemove(member.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-400">
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {members.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-400">
              Belum ada karyawan. Invite member pertama!
            </div>
          )}
        </div>
      </div>

      {/* Invite Member modal */}
      {showInvite && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setShowInvite(false)} />
          <div className="relative w-full max-w-[420px] rounded-[24px] bg-white p-7 shadow-2xl">
            {/* Modal header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Invite Anggota Baru</h3>
                <p className="mt-0.5 text-xs text-gray-400">Kirim undangan bergabung ke tim</p>
              </div>
              <button onClick={() => setShowInvite(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Nama Lengkap</label>
                <input type="text" placeholder="Contoh: Budi Santoso" value={inviteForm.name}
                  onChange={e => setInvite(f => ({ ...f, name: e.target.value }))} required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-orange-300" />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-gray-700">Alamat Email</label>
                <input type="email" placeholder="nama@toko.com" value={inviteForm.email}
                  onChange={e => setInvite(f => ({ ...f, email: e.target.value }))} required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-300 outline-none focus:border-orange-300" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Role</label>
                <div className="grid grid-cols-3 gap-2">
                  {EMPLOYEE_ROLES.map(r => {
                    const b = roleBadge[r];
                    const isActive = inviteForm.role === r;
                    return (
                      <button type="button" key={r}
                        onClick={() => setInvite(f => ({ ...f, role: r }))}
                        className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                          isActive
                            ? `${b.bg} ${b.text} border-transparent`
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}>
                        {r}
                      </button>
                    );
                  })}
                </div>

                {/* Role description — reflects live edits from Hak Akses */}
                <div className="mt-3 rounded-xl bg-gray-50 px-4 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Akses {inviteForm.role}</p>
                  <p className="text-xs text-gray-500">
                    {[...perms[inviteForm.role]].join(" · ") || "Tidak ada akses"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowInvite(false)}
                  className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                  Batal
                </button>
                <button type="submit"
                  className="flex-1 rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white hover:bg-[#E05E00]">
                  Kirim Undangan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit role modal */}
      {editMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={() => setEdit(null)} />
          <div className="relative w-full max-w-[380px] rounded-[24px] bg-white p-7 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-900">Ubah Role</h3>
                <p className="mt-0.5 text-xs text-gray-400">{editMember.name}</p>
              </div>
              <button onClick={() => setEdit(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              {EMPLOYEE_ROLES.map(r => {
                const b = roleBadge[r];
                const isActive = editMember.role === r;
                return (
                  <button type="button" key={r}
                    onClick={() => setEdit(m => m ? { ...m, role: r } : m)}
                    className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                      isActive
                        ? `${b.bg} ${b.text} border-transparent`
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}>
                    {r}
                  </button>
                );
              })}
            </div>

            <div className="mb-5 rounded-xl bg-gray-50 px-4 py-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">Akses {editMember.role}</p>
              <p className="text-xs text-gray-500">{[...perms[editMember.role]].join(" · ") || "Tidak ada akses"}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setEdit(null)}
                className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                Batal
              </button>
              <button
                onClick={() => {
                  setMembers(prev => prev.map(m => m.id === editMember.id ? { ...m, role: editMember.role } : m));
                  setEdit(null);
                }}
                className="flex-1 rounded-xl bg-[#FF6B00] py-3 text-sm font-bold text-white hover:bg-[#E05E00]">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
