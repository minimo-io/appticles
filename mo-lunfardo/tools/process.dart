#!/usr/bin/env dart
// process lunfardo dictionary raw file
// the process assumes the following structure: [term]:[description]
// https://github.com/minimo-io

// import 'dart:async';
import 'dart:io';
import 'dart:convert';

main(List<String> args) {
  var dir = Directory.current.path;
  var p = Platform.script.path;

  File('dicc.txt').readAsString().then((String contents) {
    String contentsWithNoLines = contents.replaceAll("\r", "");
    List<String> words = contentsWithNoLines.split("\n");
    List<Map<String, String>> distilledTerms = []; // final string of terms

    for (var word in words) {
      var wordIndex = words.indexOf(word);
      // if its only a number then its the page number from pdf and skip
      if (isNumeric(word)) continue;
      // capitalize
      //  word = word.capitalize();

      if (word.contains(":")) {
        List termList = word.split(":"); // [0]: term [1]: description
        // add the term
        distilledTerms.add({
          't': termList[0],
          'd': termList[1].toString().trim(),
        });
      } else {
        // if the following line does not have an : then its not a new term
        // but a part of the previus one.
        // here we should add the term to the previous.
        // word in this case is just a line with the rest of the description
        // print(word);
        // get last element of the terms array
        Map<String, String> lastElement = distilledTerms.last;
        int lastElementIndex = distilledTerms.indexOf(distilledTerms.last);

        lastElement["d"] = lastElement["d"].toString() + " " + word;

        // replace for the now complete term description
        distilledTerms[lastElementIndex] = lastElement;
      }
    }

    saveFile(json.encode(distilledTerms));
  });
}

bool isNumeric(String? s) {
  if (s == null) {
    return false;
  }
  return double.tryParse(s) != null;
}

void saveFile(String string) async {
  File file = File(await "dicc.json");
  file.writeAsString(string);
}

extension StringExtension on String {
  String capitalize() {
    return "${this[0].toUpperCase()}${this.substring(1).toLowerCase()}";
  }
}
