```sql
http://localhost:3000/?
  target=https%3A%2F%2Frp.mc-plus-st.jp &
  actor=1 &
  lang=ja &
  is_force=1 &
  matching_timeout=5 &
  webrtc_timeout=30 &
  webrtc_max_time=7200 &
  is_debug=2 &
  is_auth=0 &
  is_mc_startup=1 &
  is_proctor=0 &
  max_rectime=7200 &
  tester_retry=100 &
  intervaltime=20 &
  is_voice_recording=1 &
  video_recording_preference=15 &   -- 这里是，录音质量的地方
  voice_quality_preference=6 &      -- 这里是，录音质量的地方
  is_record=1 &
  is_summary=1 &
  is_mobile=0 &
  is_conv=0 &
  exam_url="" &
  region="" &
  exam_name="" &
  exam_datetime="" &
  ai_after_analysis="1_2_3_4" &
  is_ai_auth=2 &
  is_ai_faild_manual=3 &
  is_ai_idcard_request=1 &
  ai_face_retry=3 &
  ai_idcard_retry=2 &
  ai_idcard_type="1_2_3" &
  ai_all_retry=3 &
  ai_namematch=0 & 
  capture=2 &
  capturecheck=1 &

  raw_startup_url=https%3A%2F%2Fsample.mc-plus.jp%2Fapi%2Fv1%2Fstartup.php%3Ftarget%3Dhttps%3A%2F%2Frp.mc-plus-st.jp%26actor%3D1%26lang%3Dja%26is_force%3D1%26matching_timeout%3D5%26webrtc_timeout%3D30%26webrtc_max_time%3D7200%26is_debug%3D2%26is_auth%3D0%26is_mc_startup%3D1%26is_proctor%3D0%26max_rectime%3D7200%26tester_retry%3D100%26intervaltime%3D20%26is_voice_recording%3D1%26video_recording_preference%3D15%26voice_quality_preference%3D6%26is_record%3D1%26is_summary%3D1%26is_mobile%3D0%26is_conv%3D0%26exam_url%3D%2522%2522%26region%3D%2522%2522%26exam_name%3D%2522%2522%26exam_datetime%3D%2522%2522%26ai_after_analysis%3D%25221_2_3_4%2522%26is_ai_auth%3D2%26is_ai_faild_manual%3D3%26is_ai_idcard_request%3D1%26ai_face_retry%3D3%26ai_idcard_retry%3D2%26ai_idcard_type%3D%25221_2_3%2522%26ai_all_retry%3D3%26ai_namematch%3D0%26capture%3D2%26capturecheck%3D1 &
  /*
    https://sample.mc-plus.jp/api/v1/startup.php?
      target=https://rp.mc-plus-st.jp & 
        actor=1 &     lang=ja &     is_force=1 &    matching_timeout=5 &    webrtc_timeout=30 &     webrtc_max_time=7200 & 
        is_debug=2 &  is_auth=0 &   is_mc_startup=1 &   is_proctor=0 &    max_rectime=7200 &    tester_retry=100 & 
        intervaltime=20 &   is_voice_recording=1 &    video_recording_preference=15 &   voice_quality_preference=6 &
        is_record=1 &   is_summary=1 &    is_mobile=0 &   is_conv=0 &   exam_url="" & 
        region="" &   exam_name="" &    exam_datetime="" &    ai_after_analysis="1_2_3_4"   & 
        is_ai_auth=2 &    is_ai_faild_manual=3 &    is_ai_idcard_request=1 &    ai_face_retry=3 & 
        ai_idcard_retry=2 &   ai_idcard_type="1_2_3" &    ai_all_retry=3 &    ai_namematch=0 &    capture=2 &   capturecheck=1
  */

  access_token=614a6ffad652fd2d238bfed5b22bd674225c0ead904d1d9a532b50126364f382e &
  in_server=https%3A%2F%2Fsample.mc-plus.jp
  /*
    https://sample.mc-plus.jp
  */

```