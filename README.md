### API
```
    let xmWaveform = new XmWaveform({
        container: '#waveform',
        waveJsUrl: 'group39/M00/A0/BE/wKgJn1poJavQXSBWAAAKpLwdBt84384.js'
      })

      let x = 0
      function update() {
        x += 0.001
        xmWaveform.updateProgress(x)
        window.requestAnimationFrame(update)
      }

      xmWaveform.on('mouseup', (aa) => {

      })

      xmWaveform.destory()
      
```