program spectre_access_control_v1.aleo;

struct grant:
    account as address;
    role as u8;


mapping grants:
	key as field.public;
	value as boolean.public;


mapping role_admins:
	key as u8.public;
	value as u8.public;




function check_role:
    input r0 as u8.private;
    input r1 as address.private;
    async check_role r0 r1 into r2;
    output r2 as spectre_access_control_v1.aleo/check_role.future;

finalize check_role:
    input r0 as u8.public;
    input r1 as address.public;
    cast r1 r0 into r2 as grant;
    hash.bhp256 r2 into r3 as field;
    contains grants[r3] into r4;
    assert.eq r4 true;




function check_role_admin:
    input r0 as u8.private;
    input r1 as address.private;
    async check_role_admin r0 r1 into r2;
    output r2 as spectre_access_control_v1.aleo/check_role_admin.future;

finalize check_role_admin:
    input r0 as u8.public;
    input r1 as address.public;
    get.or_use role_admins[r0] 0u8 into r2;
    cast r1 r2 into r3 as grant;
    hash.bhp256 r3 into r4 as field;
    contains grants[r4] into r5;
    assert.eq r5 true;




function grant_role:
    input r0 as u8.private;
    input r1 as address.private;
    async grant_role r0 r1 self.caller into r2;
    output r2 as spectre_access_control_v1.aleo/grant_role.future;

finalize grant_role:
    input r0 as u8.public;
    input r1 as address.public;
    input r2 as address.public;
    get.or_use role_admins[r0] 0u8 into r3;
    cast r2 r3 into r4 as grant;
    hash.bhp256 r4 into r5 as field;
    contains grants[r5] into r6;
    assert.eq r6 true;

