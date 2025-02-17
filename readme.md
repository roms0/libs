0001 touch system
0002 untouch system

phase points
001 skip if suppliers some points != null
.
1 system read supplier
2 DEPRECATED system enable consumers
3 system place enabled promenade items

phase prom
002 DEPRECATED skip if every promenade item doesn't have placement
002a play if some promenade position > main position
.
4 system read promenades
5 system billing

phase earn
003 N/I DEPRECATED skip if earn items every enabled = false
.
6 system read eanings
5 system billing

phase build
004 skip if some item master & established item.established = state.turn
005 skip if every blueprint cost > main balance
.
7 system building (create pay, create establishment)
5 system billing

phase fin (if state.phase = null)
8 N/I DEPRECATED system cooldown (all enabled = true > enabled = false)
9 system transit (turn + 1)
