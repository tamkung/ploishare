import React from 'react'

function Vertify() {
  return (
    <div style={{ position:"absolute",marginTop: "5%" }}>
      <div style={{ padding: "2%",marginLeft:"10%",marginRight:"10%",borderRadius:"15px 15px 15px 15px" ,border:"1px solid lightgray"}}>
        <div class="mb-3">
          <label for="formGroupExampleInput" class="form-label">Email</label>
          <input type="text" class="form-control" id="formGroupExampleInput" placeholder="กรอกอีเมล์ของคุณ" />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Password</label>
          <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="กรอกรหัสผ่านของคุณ" />
        </div>
        <div class="mb-3">
          <label for="formGroupExampleInput2" class="form-label">Confirm Password</label>
          <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="ยืนยันรหัสผ่านอีกครั้" />
        </div>
      </div>
    </div>
  )
}

export default Vertify