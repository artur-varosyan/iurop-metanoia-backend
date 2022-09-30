using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;
using Newtonsoft.Json;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using TMPro;

public class CloudInterface : MonoBehaviour {
    private const string API_URL = "https://t9i7xqixp4.execute-api.ap-southeast-1.amazonaws.com/metanoia-alpha/prefab";

    [SerializeField] public TMP_InputField Textbox;

    public void Download(){
        Debug.Log("Sending request to get presigned url...");

        string fileName = Textbox.text;
        StartCoroutine(getDownloadPrefabURL(fileName));
    }

    public void Upload()
    {
        Debug.Log("Sending request to get presigned url...");

        string fileName = Textbox.text;
        StartCoroutine(getUploadPrefabURL(fileName));
    }

    private IEnumerator getDownloadPrefabURL(string fileName) {
        UnityWebRequest www = UnityWebRequest.Get(API_URL + "?fileID=" + fileName + ".prefab");
        yield return www.SendWebRequest();

        Debug.Log("Response received:");
 
        if (www.result != UnityWebRequest.Result.Success) {
            Debug.Log(www.error);
        }
        else {
            Debug.Log(www.downloadHandler.text);
            var responseBody = JsonConvert.DeserializeObject<Dictionary<string, string>>(www.downloadHandler.text);
            string presignedURL = responseBody["url"];
            Debug.Log(presignedURL);

            StartCoroutine(getPrefab(presignedURL, fileName));
        }
    }

    private IEnumerator getUploadPrefabURL(string fileName)
    {
        UnityWebRequest www = UnityWebRequest.Put(API_URL + "?fileID=" + fileName + ".prefab", new byte[] {});
        yield return www.SendWebRequest();

        Debug.Log("Response received:");

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log(www.downloadHandler.text);
            var responseBody = JsonConvert.DeserializeObject<Dictionary<string, string>>(www.downloadHandler.text);
            string presignedURL = responseBody["url"];
            Debug.Log(presignedURL);

            StartCoroutine(uploadPrefab(presignedURL, fileName));
        }
    }

    private IEnumerator getPrefab(string presignedURL, string fileName)
    {
        Debug.Log("Downloading file...");
        UnityWebRequest www = UnityWebRequest.Get(presignedURL);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            string savePath = string.Format("{0}/{1}.prefab", Application.dataPath, fileName);
            Debug.Log(savePath);
            System.IO.File.WriteAllText(savePath, www.downloadHandler.text);
            Debug.Log("File should be downloaded.");

            GameObject prefab = Resources.Load(fileName) as GameObject;
            Debug.Log(prefab);

            instantiatePrefab(prefab);
        }
    }

    private IEnumerator uploadPrefab(string presignedURL, string fileName)
    {
        string sourcePath = string.Format("{0}/Resources/{1}.prefab", Application.dataPath, fileName);
        var prefab = System.IO.File.ReadAllBytes(sourcePath);

        UnityWebRequest www = UnityWebRequest.Put(presignedURL, prefab);
        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("File should be uploaded.");
        }
    }

    private void instantiatePrefab(GameObject prefab)
    {
        Instantiate(prefab, new Vector3(0, 0, 0), Quaternion.identity);
    }
}



